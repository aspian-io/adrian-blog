import { NotFoundError } from "../../errors/not-found-error";
import { CacheOptionAreaEnum, CacheOptionServiceEnum } from "../../infrastructure/cache/cache-options.infra";
import { clearCache } from "../../infrastructure/cache/clear-cache.infra";
import { Comment } from "../../models/post-comments/post-comment.model";

export async function postCommentDeleteService ( id: string ) {
  const comment = await Comment.findById( id );
  if ( !comment ) throw new NotFoundError();

  await Comment.updateMany( {}, {
    $pullAll: {
      replies: [ { _id: comment.id } ]
    }
  } );

  await Comment.updateMany( { parent: comment.id }, {
    $unset: { parent: "" }
  } );

  await comment.delete();
  clearCache( CacheOptionAreaEnum.ADMIN, CacheOptionServiceEnum.POST_COMMENT );
  return comment;
}