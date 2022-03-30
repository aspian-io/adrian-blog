import { BaseOnlyUpdateAttrs, BaseOnlyUpdateDoc, baseOnlyUpdateSchema, baseSchemaOptions } from "models/base/base.model";
import { Document, model, Model, Schema } from "mongoose";

// Settings keys for all services
export enum SettingsKeyEnum {
  SMS_PROVIDER = "SMS_PROVIDER",
  SMS_ORIGINATOR = "SMS_ORIGINATOR",
  SMS_API_KEY = "SMS_API_KEY",
  SMS_VERIFICATION_CODE_PATTERN = "SMS_VERIFICATION_CODE_PATTERN",
  SMS_BIRTHDAY_CONGRATS = "SMS_BIRTHDAY_CONGRATS",
  SMS_BIRTHDAY_CONGRATS_TIME = "SMS_BIRTHDAY_CONGRATS_TIME",

  EMAIL_NEWSLETTER_SEND = "EMAIL_NEWSLETTER_SEND",
  EMAIL_NEWSLETTER_SEND_TIME = "EMAIL_NEWSLETTER_SEND_TIME",
  EMAIL_NEWSLETTER_HEADER = "EMAIL_NEWSLETTER_HEADER",
  EMAIL_NEWSLETTER_BODY = "EMAIL_NEWSLETTER_HEADER",
  EMAIL_NEWSLETTER_FOOTER = "EMAIL_NEWSLETTER_HEADER",

  COMMENT_IS_APPROVED = "COMMENT_IS_APPROVED",
  COMMENT_FORBIDDEN_EXPRESSIONS = "COMMENT_FORBIDDEN_EXPRESSIONS",
  COMMENT_FORBIDDEN_SUSPEND = "COMMENT_FORBIDDEN_SUSPEND",
  COMMENT_MAX_LENGTH = "COMMENT_MAX_LENGTH",

  ATTACHMENT_URL_EXP_HOURS = "ATTACHMENT_URL_EXPIRATION"


}

export enum SettingsServiceEnum {
  ACTIVITIES = "ACTIVITIES",
  ATTACHMENTS = "ATTACHMENTS",
  AUTH = "AUTH",
  POSTS = "POSTS",
  POST_COMMENTS = "POST_COMMENTS",
  TAXONOMIES = "TAXONOMIES",
  SMS = "SMS",
  EMAIL = "EMAIL"
}

export interface SettingsAttr extends BaseOnlyUpdateAttrs {
  key: SettingsKeyEnum;
  value: string;
  service: SettingsServiceEnum;
}

export interface SettingsDoc extends BaseOnlyUpdateDoc, Document {
  key: SettingsKeyEnum;
  value: string;
  service: SettingsServiceEnum;
}

interface SettingsModel extends Model<SettingsDoc> {
  build ( attrs: SettingsAttr ): SettingsDoc;
}

const settingsSchema = new Schema<SettingsDoc, SettingsModel>( {
  key: { type: String, required: true, enum: Object.values( SettingsKeyEnum ), unique: true },
  value: { type: String, required: true },
  service: { type: String, required: true, enum: Object.values( SettingsServiceEnum ) },
  ...baseOnlyUpdateSchema.obj
}, baseSchemaOptions );

settingsSchema.statics.build = ( attrs: SettingsAttr ) => {
  return new Settings( attrs );
};

export const Settings = model<SettingsDoc, SettingsModel>( "Settings", settingsSchema );