import { NotFoundError } from "../../errors/not-found-error";
import { CacheOptionAreaEnum, CacheOptionServiceEnum } from "../../infrastructure/cache/cache-options.infra";
import { Comment } from "../../models/post-comments/post-comment.model";

export async function postCommentDetailsService ( id: string ) {
  const comment = await Comment.findById( id )
    .cache( CacheOptionAreaEnum.ADMIN, CacheOptionServiceEnum.POST_COMMENT );
  if ( !comment ) throw new NotFoundError();

  return comment;
}