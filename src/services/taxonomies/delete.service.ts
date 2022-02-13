import mongoose from 'mongoose';
import { NotFoundError } from 'errors/not-found-error';
import { CacheOptionAreaEnum, CacheOptionServiceEnum } from 'infrastructure/cache/cache-options.infra';
import { clearCache } from 'infrastructure/cache/clear-cache.infra';
import { Taxonomy } from 'models/taxonomies/taxonomy.model';

export async function taxonomyDeleteService ( slug: string ) {
  const taxonomy = await Taxonomy.findOne( { slug } );

  if ( !taxonomy ) {
    throw new NotFoundError();
  }

  const session = await mongoose.startSession(); // Transaction session started
  session.startTransaction();

  await Taxonomy.updateMany( { parent: taxonomy.id }, { $unset: { parent: "" } }, { session } );
  await Taxonomy.updateMany( {}, {
    $pullAll: {
      children: [ { _id: taxonomy.id } ]
    }
  }, { session } );
  await taxonomy.delete( { session } );
  clearCache( CacheOptionAreaEnum.ADMIN, CacheOptionServiceEnum.TAXONOMY );

  await session.commitTransaction();
  session.endSession(); // Transaction session ended

  return taxonomy;
}