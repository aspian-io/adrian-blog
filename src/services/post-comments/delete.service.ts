import { NotFoundError } from "../../errors/not-found-error";
import { Comment } from "../../models/post-comments/post-comment.model";

export async function postCommentDeleteService ( id: string ) {
  const comment = await Comment.findById( id );
  if ( !comment ) throw new NotFoundError();

  await comment.delete();
  return comment;
}