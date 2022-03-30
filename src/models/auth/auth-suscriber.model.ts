import { LangEnum } from "infrastructure/locales/i18next-config";
import { Document, model, Model, Schema } from "mongoose";

export interface SubscriberAttrs {
  lang: LangEnum;
  email: string;
  isEmailConfirmed?: boolean;
  createdByIp: string;
  updatedByIp?: string;
  userAgent: string;
}

export interface SubscriberDoc extends Document {
  lang: LangEnum;
  email: string;
  isEmailConfirmed: boolean;
  createdByIp: string;
  updatedByIp?: string;
  userAgent: string;
}

export interface SubscriberModel extends Model<SubscriberDoc> {
  build ( attrs: SubscriberAttrs ): SubscriberDoc;
}

const subscriberSchema = new Schema<SubscriberDoc, SubscriberModel>( {
  lang: { type: String, required: true, enum: Object.values( LangEnum ) },
  email: { type: String, required: true },
  isEmailConfirmed: { type: Boolean, default: false },
  createdByIp: { type: String, required: true },
  updatedByIp: { type: String, required: false },
  userAgent: { type: String, required: true }
} );

subscriberSchema.statics.build = ( attrs: SubscriberAttrs ) => {
  return new Subscriber( attrs );
};

const Subscriber = model<SubscriberDoc, SubscriberModel>( "Subscriber", subscriberSchema );

export { Subscriber };