import { BaseMinimalAttrs, BaseMinimalDoc, baseMinimalSchema, baseSchemaOptions } from 'models/base/base.model';
import { model, Model, Schema, Document } from 'mongoose';
import { PostDoc } from '../posts/post.model';

interface AttachmentAttrs extends BaseMinimalAttrs {
  url: string;
  caption: string;
  size: number;
  posts: string[];
}

export interface AttachmentDoc extends BaseMinimalDoc, Document {
  url: string;
  caption: string;
  size: number;
  posts: PostDoc[];
}

interface AttachmentModel extends Model<AttachmentDoc> {
  build ( attrs: AttachmentAttrs ): AttachmentDoc;
}

const attachmentSchema = new Schema<AttachmentDoc, AttachmentModel>( {
  url: { type: String, required: true },
  caption: String,
  size: { type: Number, required: true },
  posts: [ { type: Schema.Types.ObjectId, ref: "Post" } ],
  ...baseMinimalSchema.obj
}, baseSchemaOptions );

attachmentSchema.statics.build = ( attrs: AttachmentAttrs ) => {
  return new Attachment( attrs );
};

const Attachment = model<AttachmentDoc, AttachmentModel>( "Attachment", attachmentSchema );

export { Attachment };