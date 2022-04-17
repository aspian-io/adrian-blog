import { BaseMinimalAttrs, BaseMinimalDoc, baseMinimalSchema, baseSchemaOptions } from "models/base/base.model";
import { Document, model, Model, Schema } from "mongoose";
import { CommentDoc } from "./post-comment.model";

export interface PostCommentLikeAttrs extends BaseMinimalAttrs {
  postComment: string;
}

export interface PostCommentLikeDoc extends BaseMinimalDoc, Document {
  postComment: CommentDoc;
}

export interface PostCommentLikeModel extends Model<PostCommentLikeDoc> {
  build ( attrs: PostCommentLikeAttrs ): PostCommentLikeDoc;
}

const postCommentLikeSchema = new Schema<PostCommentLikeDoc, PostCommentLikeModel>( {
  postComment: { type: Schema.Types.ObjectId, required: true, ref: 'Comment' },
  ...baseMinimalSchema.obj
}, baseSchemaOptions );

postCommentLikeSchema.statics.build = ( attrs: PostCommentLikeAttrs ) => {
  return new PostCommentLike( attrs );
};

const PostCommentLike = model<PostCommentLikeDoc, PostCommentLikeModel>( 'PostCommentLike', postCommentLikeSchema );

export { PostCommentLike };