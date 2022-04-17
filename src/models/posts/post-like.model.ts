import { BaseMinimalAttrs, BaseMinimalDoc, baseMinimalSchema, baseSchemaOptions } from "models/base/base.model";
import { Document, model, Model, Schema } from "mongoose";
import { PostDoc } from "./post.model";

export interface PostLikeAttrs extends BaseMinimalAttrs {
  post: string;
}

export interface PostLikeDoc extends BaseMinimalDoc, Document {
  post: PostDoc;
}

export interface PostLikeModel extends Model<PostLikeDoc> {
  build ( attrs: PostLikeAttrs ): PostLikeDoc;
}

const postLikeSchema = new Schema<PostLikeDoc, PostLikeModel>( {
  post: { type: Schema.Types.ObjectId, required: true, ref: 'Post' },
  ...baseMinimalSchema.obj
}, baseSchemaOptions );

postLikeSchema.statics.build = ( attrs: PostLikeAttrs ) => {
  return new PostLike( attrs );
};

const PostLike = model<PostLikeDoc, PostLikeModel>( 'PostLike', postLikeSchema );

export { PostLike };