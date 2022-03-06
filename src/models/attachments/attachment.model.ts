import { BaseAttrs, BaseDoc, baseSchema, baseSchemaOptions } from 'models/base/base.model';
import { model, Model, Schema, Document } from 'mongoose';

export interface AttachmentAttrs extends BaseAttrs {
  url: string;
  policy: AttachmentPolicyEnum;
  fileName: string;
  caption: string;
  size: number;
}

export interface AttachmentDoc extends BaseDoc, Document {
  url: string;
  policy: AttachmentPolicyEnum;
  fileName: string;
  caption: string;
  size: number;
}

export enum AttachmentPolicyEnum {
  DOWNLOAD = "DOWNLOAD",
  PRIVATE = "PRIVATE"
}

interface AttachmentModel extends Model<AttachmentDoc> {
  build ( attrs: AttachmentAttrs ): AttachmentDoc;
}

const attachmentSchema = new Schema<AttachmentDoc, AttachmentModel>( {
  url: { type: String, required: true },
  policy: { type: String, required: true, enum: Object.values( AttachmentPolicyEnum ) },
  fileName: { type: String, required: true },
  caption: { type: String, required: false },
  size: { type: Number, required: true },
  ...baseSchema.obj
}, baseSchemaOptions );

attachmentSchema.statics.build = ( attrs: AttachmentAttrs ) => {
  return new Attachment( attrs );
};

const Attachment = model<AttachmentDoc, AttachmentModel>( "Attachment", attachmentSchema );

export { Attachment };