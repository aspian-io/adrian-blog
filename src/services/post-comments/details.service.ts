import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { Comment } from "models/post-comments/post-comment.model";

export async function postCommentDetailsService ( id: string ) {
  const comment = await Comment.findById( id )
    .cache( CacheOptionServiceEnum.POST_COMMENT );
  if ( !comment ) throw new NotFoundError();

  return comment;
}