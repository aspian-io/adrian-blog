import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { Comment } from "models/post-comments/post-comment.model";

export async function postCommentListService () {
  const comments = await Comment.find()
    .cache( CacheOptionServiceEnum.POST_COMMENT );
  return comments;
}