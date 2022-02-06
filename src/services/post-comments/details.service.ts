import { NotFoundError } from "../../errors/not-found-error";
import { Comment } from "../../models/post-comments/post-comment.model";

export async function postCommentDetailsService ( id: string ) {
  const comment = await Comment.findById( id );
  if ( !comment ) throw new NotFoundError();

  return comment;
}