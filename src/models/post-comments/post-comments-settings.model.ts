import { BaseOnlyUpdateAttrs, BaseOnlyUpdateDoc, baseOnlyUpdateSchema, baseSchemaOptions } from "models/base/base.model";
import { Document, model, Model, Schema } from "mongoose";
import { CommentDoc } from "./post-comment.model";

export enum CommentSettingsKeyEnum {
  IS_APPROVED = "IS_APPROVED",
  FORBIDDEN_EXPRESSIONS = "FORBIDDEN_EXPRESSIONS",
  FORBIDDEN_COMMENT_SUSPEND = "FORBIDDEN_COMMENT_SUSPEND",
  MAX_LENGTH = "MAX_LENGTH"
}

export interface CommentSettingsAttr extends BaseOnlyUpdateAttrs {
  key: CommentSettingsKeyEnum;
  value: string;
}

export interface CommentSettingsDoc extends BaseOnlyUpdateDoc, Document {
  key: CommentSettingsKeyEnum;
  value: string;
}

interface CommentSettingsModel extends Model<CommentSettingsDoc> {
  build ( attrs: CommentSettingsAttr ): CommentDoc;
}

const commentSettingsSchema = new Schema<CommentSettingsDoc, CommentSettingsModel>( {
  key: { type: String, required: true, enum: Object.values( CommentSettingsKeyEnum ) },
  value: { type: String, required: true },
  ...baseOnlyUpdateSchema.obj
}, baseSchemaOptions );

commentSettingsSchema.statics.build = ( attrs: CommentSettingsAttr ) => {
  return new CommentSettings( attrs );
};

export const CommentSettings = model<CommentSettingsDoc, CommentSettingsModel>( "CommentSettings", commentSettingsSchema );