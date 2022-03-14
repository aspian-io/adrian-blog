import { BaseAttrs, BaseDoc, BaseMinimalDoc, baseMinimalSchema, baseSchema, baseSchemaOptions } from "models/base/base.model";
import { PostDoc } from "models/posts/post.model";
import { Document, model, Model, Schema } from "mongoose";

export interface CommentAttrs extends BaseAttrs {
  title: string;
  content: string;
  likes?: BaseMinimalDoc[];
  numLikes?: number;
  isApproved: boolean;
  replyLevel?: number;
  isReplyAllowed: boolean;
  parent?: string;
  replies?: string[];
  post: string;
}

export interface CommentDoc extends BaseDoc, Document {
  title: string;
  content: string;
  likes: BaseMinimalDoc[];
  numLikes: number;
  isApproved: boolean;
  replyLevel: number;
  isReplyAllowed: boolean;
  parent?: CommentDoc;
  replies?: CommentDoc[];
  post: PostDoc;
}

interface CommentModel extends Model<CommentDoc> {
  build ( attrs: CommentAttrs ): CommentDoc;
}

const commentLike = new Schema<BaseMinimalDoc>( {
  ...baseMinimalSchema.obj
}, baseSchemaOptions );

const commentSchema = new Schema<CommentDoc, CommentModel>( {
  title: { type: String, required: true },
  content: { type: String, required: true },
  likes: [ commentLike ],
  numLikes: { type: Number, default: 0 },
  isApproved: { type: Boolean, required: true, default: false },
  replyLevel: { type: Number, default: 0 },
  isReplyAllowed: { type: Boolean, required: true, default: false },
  parent: { type: Schema.Types.ObjectId, ref: "Comment" },
  replies: [ { type: Schema.Types.ObjectId, ref: "Comment" } ],
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  ...baseSchema.obj
}, baseSchemaOptions );

commentSchema.statics.build = ( attrs: CommentAttrs ) => {
  return new Comment( attrs );
};

export const Comment = model<CommentDoc, CommentModel>( "Comment", commentSchema );