import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { clearCache } from "infrastructure/cache/clear-cache";
import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { PostLocaleEnum } from "infrastructure/locales/service-locale-keys/posts.locale";
import { Post } from "models/posts/post.model";

export interface IPostReviewService {
  postId: string;
  rate: number;
  createdBy: string;
  createdByIp: string;
  userAgent: string;
}

export async function postReviewService ( params: IPostReviewService ) {
  const { postId, rate, createdBy, createdByIp, userAgent } = params;
  const post = await Post.findById( postId );
  if ( !post ) throw new NotFoundError();

  const alreadyReviewed = post.reviews.find(
    r => r.createdBy.toString() === createdBy.toString()
  );

  if ( alreadyReviewed ) {
    throw new BadRequestError( "Post already reviewed", PostLocaleEnum.ERROR_ALREADY_REVIEWED );
  }

  post.reviews.push( {
    rate,
    createdBy: createdBy as any,
    createdByIp,
    userAgent
  } );

  post.numReviews = post.reviews.length;

  post.rating = post.reviews.reduce( ( acc, item ) => item.rate + acc, 0 ) / post.reviews.length;

  await post.save();
  clearCache( CacheOptionServiceEnum.POST );
  return post;
}