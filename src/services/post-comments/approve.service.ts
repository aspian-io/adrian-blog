import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options.infra";
import { clearCache } from "infrastructure/cache/clear-cache.infra";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { Comment } from "models/post-comments/post-comment.model";

export async function postCommentApproveService ( id: string, isApproved: boolean = true ) {
  const comment = await Comment.findById( id );
  if ( !comment ) throw new NotFoundError();

  comment.set( { isApproved } );

  await comment.save();
  clearCache( CacheOptionServiceEnum.POST_COMMENT );
  return comment;
}