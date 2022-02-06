import { NotFoundError } from "../../errors/not-found-error";
import { Comment } from "../../models/post-comments/post-comment.model";

export async function postCommentApproveService ( id: string, isApproved: boolean = true ) {
  const comment = await Comment.findById( id );
  if ( !comment ) throw new NotFoundError();

  comment.set( { isApproved } );

  await comment.save();
  return comment;
}