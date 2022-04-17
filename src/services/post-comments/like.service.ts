import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { clearCache } from "infrastructure/cache/clear-cache";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { PostCommentLike } from "models/post-comments/post-comment-like.model";
import { Comment } from "models/post-comments/post-comment.model";

export interface IPostCommentLikeService {
  commentId: string;
  userId: string;
  ipAddress: string;
  userAgent: string;
}

export async function postCommentLikeService ( params: IPostCommentLikeService ) {
  const { commentId, userId, ipAddress, userAgent } = params;
  const comment = await Comment.findById( commentId ).populate( "createdBy" );
  if ( !comment ) throw new NotFoundError();

  const existingLike = await PostCommentLike.findOne( { postComment: comment.id, createdBy: userId } );
  if ( existingLike ) {
    await existingLike.delete();
  } else {
    const postCommentLike = PostCommentLike.build( {
      postComment: comment.id,
      createdBy: userId,
      createdByIp: ipAddress,
      userAgent
    } );
    await postCommentLike.save();
  }

  await comment.populate( 'numLikes' );
  clearCache( CacheOptionServiceEnum.POST_COMMENT );
  return comment;
}