import { Document, model, Model, Schema } from "mongoose";
import { BaseAttrs, BaseDoc, baseSchema, baseSchemaOptions } from "./base.model";
import { PostDoc } from "./post.model";

export interface CommentAttrs extends BaseAttrs {
  title: string;
  content: string;
  isApproved: boolean;
  indent: boolean;
  parent?: string;
  replies?: string[];
  post: string;
}

export interface CommentDoc extends BaseDoc, Document {
  title: string;
  content: string;
  isApproved: boolean;
  indent: boolean;
  parent?: CommentDoc;
  replies?: CommentDoc[];
  post: PostDoc;
}

interface CommentModel extends Model<CommentDoc> {
  build ( attrs: CommentAttrs ): CommentDoc;
}

const commentSchema = new Schema<CommentDoc, CommentModel>( {
  title: { type: String, required: true },
  content: { type: String, required: true, text: true },
  isApproved: { type: Boolean, required: true, default: false },
  indent: { type: Boolean, required: true, default: false },
  parent: { type: Schema.Types.ObjectId, ref: "Comment" },
  replies: [ { type: Schema.Types.ObjectId, ref: "Comment" } ],
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  ...baseSchema.obj
}, baseSchemaOptions );

commentSchema.statics.build = ( attrs: CommentAttrs ) => {
  return new Comment( attrs );
};

export const Comment = model<CommentDoc, CommentModel>( "Comment", commentSchema );