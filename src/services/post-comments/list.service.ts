import { Comment } from "../../models/post-comments/post-comment.model";

export async function postCommentListService () {
  const comments = await Comment.find();
  return comments;
}