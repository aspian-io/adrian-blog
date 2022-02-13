import { AttachmentDoc } from 'models/attachments/attachment.model';
import { BaseAttrs, BaseDoc, baseSchema, baseSchemaOptions } from 'models/base/base.model';
import { TaxonomyDoc } from 'models/taxonomies/taxonomy.model';
import { model, Schema, Model, Document, Types } from 'mongoose';

export enum PostVisibilityEnum {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE"
}

export enum PostStatusEnum {
  PUBLISH = "PUBLISH",
  FUTURE = "FUTURE",
  DRAFT = "DRAFT",
  PENDING = "PENDING",
  AUTO_DRAFT = "AUTO_DRAFT",
  INHERIT = "INHERIT"
}

export enum PostTypeEnum {
  BLOG = "BLOG",
  PAGE = "PAGE",
  PRODUCT = "PRODUCT",
  NEWS = "NEWS",
  BANNER = "BANNER"
}

export interface PostAttrs extends BaseAttrs {
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  slug: string;
  visibility: PostVisibilityEnum;
  status: PostStatusEnum;
  scheduledFor?: Date;
  commentAllowed: Boolean;
  viewCount?: Number;
  type: PostTypeEnum;
  isPinned?: Boolean;
  child?: string;
  parent?: string;
  taxonomies: string[];
  attachments: string[];
  postmeta?: Postmeta[];
}

export interface PostDoc extends BaseDoc, Document {
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  slug: string;
  visibility: PostVisibilityEnum;
  status: PostStatusEnum;
  scheduledFor?: Date;
  commentAllowed: Boolean;
  viewCount?: Number;
  type: PostTypeEnum;
  isPinned?: Boolean;
  child?: PostDoc;
  parent?: PostDoc;
  taxonomies: TaxonomyDoc[];
  attachments: AttachmentDoc[];
  postmeta?: Postmeta[];
}

interface PostModel extends Model<PostDoc> {
  build ( attrs: PostAttrs ): PostDoc;
}

// Postmeta Subdocument Interface
export interface Postmeta {
  key: string;
  value: string;
}

// Postmeta Subdocument Schema
const postmetaSchema = new Schema( {
  key: { type: String, required: true },
  value: { type: String, required: true }
} );

// Post Model Schema
const postSchema = new Schema<PostDoc, PostModel>( {
  title: { type: String, required: true },
  subtitle: String,
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  visibility: { type: String, required: true, default: PostVisibilityEnum.PUBLIC, enum: Object.values( PostVisibilityEnum ) },
  status: { type: String, required: true, default: PostStatusEnum.PUBLISH, enum: Object.values( PostStatusEnum ) },
  scheduledFor: Date,
  commentAllowed: { type: Boolean, required: true, default: true },
  viewCount: { type: Number, default: 0 },
  type: { type: String, required: true, default: PostTypeEnum.BLOG, enum: Object.values( PostTypeEnum ) },
  isPinned: { type: Boolean, default: false },
  child: { type: Schema.Types.ObjectId, ref: "Post" },
  parent: { type: Schema.Types.ObjectId, ref: "Post" },
  taxonomies: [ { type: Schema.Types.ObjectId, ref: "Taxonomy" } ],
  attachments: [ { type: Schema.Types.ObjectId, ref: "Attachment" } ],
  postmeta: [ postmetaSchema ],
  ...baseSchema.obj
}, baseSchemaOptions );

postSchema.statics.build = ( attrs: PostAttrs ) => {
  return new Post( attrs );
};

const Post = model<PostDoc, PostModel>( "Post", postSchema );

export { Post };