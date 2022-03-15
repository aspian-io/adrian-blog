import { AttachmentDoc } from 'models/attachments/attachment.model';
import { BaseAttrs, BaseDoc, BaseMinimalDoc, baseMinimalSchema, baseSchema, baseSchemaOptions } from 'models/base/base.model';
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
  INHERIT = "INHERIT",
  ARCHIVE = "ARCHIVE"
}

export enum PostTypeEnum {
  BLOG = "BLOG",
  PAGE = "PAGE",
  NEWS = "NEWS",
  BANNER = "BANNER",
  EMAIL_TEMPLATE = "EMAIL_TEMPLATE"
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
  scheduledExpiration?: Date;
  commentAllowed: Boolean;
  viewCount?: Number;
  type: PostTypeEnum;
  isPinned?: Boolean;
  order?: number;
  child?: string;
  parent?: string;
  taxonomies: string[];
  attachments: string[];
  reviews?: PostReview[];
  rating?: number;
  numReviews?: number;
  likes?: BaseMinimalDoc[];
  numLikes?: number;
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
  scheduledExpiration?: Date;
  commentAllowed: Boolean;
  viewCount: number;
  type: PostTypeEnum;
  isPinned?: Boolean;
  order?: number;
  child?: PostDoc;
  parent?: PostDoc;
  taxonomies: TaxonomyDoc[];
  attachments: AttachmentDoc[];
  reviews: PostReview[];
  rating: number;
  numReviews: number;
  likes: BaseMinimalDoc[];
  numLikes: number;
}

interface PostModel extends Model<PostDoc> {
  build ( attrs: PostAttrs ): PostDoc;
}

export interface PostReview extends BaseMinimalDoc {
  rate: number;
}

const reviewSchema = new Schema<PostReview>( {
  rate: { type: Number, min: 0, max: 5 },
  ...baseMinimalSchema.obj
}, baseSchemaOptions );

const postLike = new Schema<BaseMinimalDoc>( {
  ...baseMinimalSchema.obj
}, baseSchemaOptions );

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
  scheduledExpiration: Date,
  commentAllowed: { type: Boolean, required: true, default: true },
  viewCount: { type: Number, default: 0 },
  type: { type: String, required: true, default: PostTypeEnum.BLOG, enum: Object.values( PostTypeEnum ) },
  isPinned: { type: Boolean, default: false },
  order: { type: Number, required: false },
  child: { type: Schema.Types.ObjectId, ref: "Post" },
  parent: { type: Schema.Types.ObjectId, ref: "Post" },
  taxonomies: [ { type: Schema.Types.ObjectId, ref: "Taxonomy" } ],
  attachments: [ { type: Schema.Types.ObjectId, ref: "Attachment" } ],
  reviews: [ reviewSchema ],
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  likes: [ postLike ],
  numLikes: { type: Number, default: 0 },
  ...baseSchema.obj
}, baseSchemaOptions );

postSchema.statics.build = ( attrs: PostAttrs ) => {
  return new Post( attrs );
};

const Post = model<PostDoc, PostModel>( "Post", postSchema );

export { Post };