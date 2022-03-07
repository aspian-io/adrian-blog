import { CacheOptionServiceEnum } from 'infrastructure/cache/cache-options';
import { clearCache } from 'infrastructure/cache/clear-cache';
import { NotFoundError } from 'infrastructure/errors/not-found-error';
import { Post } from 'models/posts/post.model';
import mongoose from 'mongoose';

export async function postDeleteService ( slug: string ) {
  const post = await Post.findOne( { slug } );
  if ( !post ) throw new NotFoundError();

  const session = await mongoose.startSession(); // Transaction session started
  session.startTransaction();

  await Post.updateMany( { parent: post.id }, { $unset: { parent: "" } }, { session } );
  await Post.updateMany( { child: post.id }, { $unset: { child: "" } }, { session } );
  await post.delete( { session } );
  clearCache( CacheOptionServiceEnum.POST );

  await session.commitTransaction();
  session.endSession();

  return post;
}