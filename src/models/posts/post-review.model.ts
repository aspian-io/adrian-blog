import { BaseMinimalAttrs, BaseMinimalDoc, baseMinimalSchema, baseSchemaOptions } from "models/base/base.model";
import { Document, model, Model, Schema } from "mongoose";
import { PostDoc } from "./post.model";

export interface PostReviewAttrs extends BaseMinimalAttrs {
  post: string;
  rate: number;
}

export interface PostReviewDoc extends BaseMinimalDoc, Document {
  post: PostDoc;
  rate: number;
}

export interface PostReviewModel extends Model<PostReviewDoc> {
  build ( attrs: PostReviewAttrs ): PostReviewDoc;
}

const postReviewSchema = new Schema<PostReviewDoc, PostReviewModel>( {
  rate: { type: Number, min: 0, max: 5 },
  post: { type: Schema.Types.ObjectId, required: true, ref: 'Post' },
  ...baseMinimalSchema.obj
}, baseSchemaOptions );

postReviewSchema.statics.build = ( attrs: PostReviewAttrs ) => {
  return new PostReview( attrs );
};

const PostReview = model<PostReviewDoc, PostReviewModel>( 'PostReview', postReviewSchema );

export { PostReview };