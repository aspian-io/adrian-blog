import mongoose from 'mongoose';
import { CacheOptionServiceEnum } from 'infrastructure/cache/cache-options';
import { clearCache } from 'infrastructure/cache/clear-cache';
import { Taxonomy } from 'models/taxonomies/taxonomy.model';
import { NotFoundError } from 'infrastructure/errors/not-found-error';
import { Post } from 'models/posts/post.model';

export async function taxonomyDeleteService ( slug: string ) {
  const taxonomy = await Taxonomy.findOne( { slug } );

  if ( !taxonomy ) {
    throw new NotFoundError();
  }

  const session = await mongoose.startSession(); // Transaction session started
  session.startTransaction();

  // Update related posts taxonomies
  await Post.updateMany( {}, {
    $pullAll: {
      taxonomies: [ { _id: taxonomy.id } ]
    }
  }, { session } );
  // Update child taxonomies
  if ( taxonomy.children.length ) {
    await Taxonomy.updateMany( { parent: taxonomy.id }, { $unset: { parent: "" } }, { session } );
  }
  if ( taxonomy.parent ) {
    // Update parent taxonomy
    await Taxonomy.updateOne( { _id: taxonomy.parent }, {
      $pullAll: {
        children: [ { _id: taxonomy.id } ]
      }
    }, { session } );
  }
  await taxonomy.delete( { session } );
  clearCache( CacheOptionServiceEnum.POST );
  clearCache( CacheOptionServiceEnum.TAXONOMY );

  await session.commitTransaction();
  session.endSession(); // Transaction session ended

  return taxonomy;
}