import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { clearCache } from "infrastructure/cache/clear-cache";
import { NotFoundError } from "infrastructure/errors/not-found-error";
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

  const existingLike = comment.likes.filter( l => l.createdBy.toString() === userId.toString() )[ 0 ];
  if ( existingLike ) {
    comment.likes = comment.likes.filter( l => l.createdBy.toString() !== userId.toString() );
    comment.numLikes = comment.likes.length;
  } else {
    comment.likes.push( {
      createdBy: userId as any,
      createdByIp: ipAddress,
      userAgent
    } );
    comment.numLikes = comment.likes.length;
  }

  await comment.save();
  clearCache( CacheOptionServiceEnum.POST_COMMENT );
  return comment;
}