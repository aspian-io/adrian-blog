import { NotFoundError } from "errors/not-found-error";
import { CacheOptionAreaEnum, CacheOptionServiceEnum } from "infrastructure/cache/cache-options.infra";
import { clearCache } from "infrastructure/cache/clear-cache.infra";
import { Comment } from "models/post-comments/post-comment.model";

export async function postCommentApproveService ( id: string, isApproved: boolean = true ) {
  const comment = await Comment.findById( id );
  if ( !comment ) throw new NotFoundError();

  comment.set( { isApproved } );

  await comment.save();
  clearCache( CacheOptionAreaEnum.ADMIN, CacheOptionServiceEnum.POST_COMMENT_SETTINGS );
  return comment;
}