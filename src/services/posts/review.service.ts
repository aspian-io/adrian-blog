import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { clearCache } from "infrastructure/cache/clear-cache";
import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { PostLocaleEnum } from "infrastructure/locales/service-locale-keys/posts.locale";
import { PostReview } from "models/posts/post-review.model";
import { Post } from "models/posts/post.model";

export interface IPostReviewService {
  slug: string;
  rate: number;
  createdBy: string;
  createdByIp: string;
  userAgent: string;
}

export async function postReviewService ( params: IPostReviewService ) {
  const { slug, rate, createdBy, createdByIp, userAgent } = params;
  const post = await Post.findOne( { slug } ).populate( 'reviews' );
  if ( !post ) throw new NotFoundError();

  const alreadyReviewed = post.reviews.find(
    r => r.createdBy.toString() === createdBy.toString()
  );

  if ( alreadyReviewed ) {
    throw new BadRequestError( "Post already reviewed", PostLocaleEnum.ERROR_ALREADY_REVIEWED );
  }

  const review = PostReview.build( {
    rate,
    post: post.id,
    createdBy,
    createdByIp,
    userAgent
  } );
  await review.save();
  await post.populate( 'reviews' );

  post.numReviews = post.reviews.length;

  post.rating = post.reviews.reduce( ( acc, item ) => item.rate + acc, 0 ) / post.reviews.length;

  await post.save();
  clearCache( CacheOptionServiceEnum.POST );
  return post;
}