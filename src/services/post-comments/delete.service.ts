import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { clearCache } from "infrastructure/cache/clear-cache";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { Comment } from "models/post-comments/post-comment.model";
import mongoose from 'mongoose';

export async function postCommentDeleteService ( id: string ) {
  const comment = await Comment.findById( id );
  if ( !comment ) throw new NotFoundError();

  const session = await mongoose.startSession(); // Transaction session started
  session.startTransaction();

  await Comment.updateMany( {}, {
    $pullAll: {
      replies: [ { _id: comment.id } ]
    }
  }, { session } );
  await Comment.updateMany( { parent: comment.id }, {
    $unset: { parent: "" }
  }, { session } );
  await comment.delete( { session } );
  clearCache( CacheOptionServiceEnum.POST_COMMENT );

  await session.commitTransaction();
  session.endSession(); // Transaction session ended

  return comment;
}