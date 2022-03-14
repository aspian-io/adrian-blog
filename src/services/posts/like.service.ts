import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { clearCache } from "infrastructure/cache/clear-cache";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { Post } from "models/posts/post.model";

export interface IPostLikeService {
  postId: string;
  userId: string;
  ipAddress: string;
  userAgent: string;
}

export async function postLikeService ( params: IPostLikeService ) {
  const { postId, userId, ipAddress, userAgent } = params;
  const post = await Post.findById( postId );
  if ( !post ) throw new NotFoundError();

  const existingLike = post.likes.filter( l => l.createdBy.toString() === userId.toString() )[ 0 ];
  if ( existingLike ) {
    post.likes = post.likes.filter( l => l.createdBy.toString() !== userId.toString() );
    post.numLikes = post.likes.length;
  } else {
    post.likes.push( {
      createdBy: userId,
      createdByIp: ipAddress,
      userAgent
    } );
    post.numLikes = post.likes.length;
  }

  await post.save();
  clearCache( CacheOptionServiceEnum.POST );
  return post;
}