import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { clearCache } from "infrastructure/cache/clear-cache";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { PostLike } from "models/posts/post-like.model";
import { Post } from "models/posts/post.model";

export interface IPostLikeService {
  slug: string;
  userId: string;
  ipAddress: string;
  userAgent: string;
}

export async function postLikeService ( params: IPostLikeService ) {
  const { slug, userId, ipAddress, userAgent } = params;
  let post = await Post.findOne( { slug } );
  if ( !post ) throw new NotFoundError();

  const existingLike = await PostLike.findOne( { post: post.id, createdBy: userId } );
  if ( existingLike ) {
    await existingLike.delete();
  } else {
    const postLike = PostLike.build( {
      post: post.id,
      createdBy: userId,
      createdByIp: ipAddress,
      userAgent
    } );
    await postLike.save();
  }
  clearCache( CacheOptionServiceEnum.POST );
  post = await post.populate( 'numLikes' );
  return post;
}