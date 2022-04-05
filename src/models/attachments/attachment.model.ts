import { BaseAttrs, BaseDoc, baseSchema, baseSchemaOptions } from 'models/base/base.model';
import { Document, model, Model, Schema } from 'mongoose';

export interface AttachmentAttrs extends BaseAttrs {
  path: string;
  policy: AttachmentPolicyEnum;
  fileName: string;
  type: string;
  caption: string;
  size: number;
  videoThumbnail?: string;
}

export interface AttachmentDoc extends BaseDoc, Document {
  path: string;
  policy: AttachmentPolicyEnum;
  fileName: string;
  type: string;
  caption: string;
  size: number;
  videoThumbnail?: AttachmentDoc;
}

export enum AttachmentPolicyEnum {
  DOWNLOAD = "DOWNLOAD",
  PRIVATE = "PRIVATE"
}

interface AttachmentModel extends Model<AttachmentDoc> {
  build ( attrs: AttachmentAttrs ): AttachmentDoc;
}

const attachmentSchema = new Schema<AttachmentDoc, AttachmentModel>( {
  path: { type: String, required: true },
  policy: { type: String, required: true, enum: Object.values( AttachmentPolicyEnum ) },
  fileName: { type: String, required: true },
  type: { type: String, required: true },
  caption: { type: String, required: false },
  size: { type: Number, required: true },
  videoThumbnail: { type: Schema.Types.ObjectId, ref: "Attachment" },
  ...baseSchema.obj
}, baseSchemaOptions );

attachmentSchema.statics.build = ( attrs: AttachmentAttrs ) => {
  return new Attachment( attrs );
};

const Attachment = model<AttachmentDoc, AttachmentModel>( "Attachment", attachmentSchema );

export { Attachment };