import { LangEnum } from 'infrastructure/locales/i18next-config';
import { AttachmentDoc } from 'models/attachments/attachment.model';
import { BaseAttrs, BaseDoc, baseSchema, baseSchemaOptions } from 'models/base/base.model';
import { TaxonomyDoc } from 'models/taxonomies/taxonomy.model';
import { model, Schema, Model, Document } from 'mongoose';
import { PostLikeDoc } from './post-like.model';
import { PostReviewDoc } from './post-review.model';

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
  EMAIL_TEMPLATE = "EMAIL_TEMPLATE",
  NEWSLETTER_HEADER_TEMPLATE = "NEWSLETTER_HEADER_TEMPLATE",
  NEWSLETTER_BODY_TEMPLATE = "NEWSLETTER_BODY_TEMPLATE",
  NEWSLETTER_FOOTER_TEMPLATE = "NEWSLETTER_FOOTER_TEMPLATE",
  SMS_TEMPLATE = "SMS_TEMPLATE",
  SMS_BIRTHDAY_TEMPLATE = "SMS_BIRTHDAY_TEMPLATE"
}

// Postmeta Subdocument Interface
export interface Postmeta {
  key: string;
  value: string;
}

// Postmeta Subdocument Schema
const postmetaSchema = new Schema<Postmeta>( {
  key: { type: String, required: true },
  value: { type: String, required: true }
} );

export interface PostAttrs extends BaseAttrs {
  lang: LangEnum;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  slug: string;
  featuredImage?: string;
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
  rating?: number;
  numReviews?: number;
  postmeta?: Postmeta[];
}

export interface PostDoc extends BaseDoc, Document {
  lang: LangEnum;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  slug: string;
  featuredImage?: AttachmentDoc;
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
  reviews: PostReviewDoc[];
  rating: number;
  numReviews: number;
  likes?: PostLikeDoc[];
  numLikes?: number;
  postmeta?: Postmeta[];
}

export interface PostModel extends Model<PostDoc> {
  build ( attrs: PostAttrs ): PostDoc;
}

// Post Model Schema
const postSchema = new Schema<PostDoc, PostModel>( {
  lang: { type: String, required: true, enum: Object.values( LangEnum ) },
  title: { type: String, required: true },
  subtitle: String,
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  featuredImage: { type: Schema.Types.ObjectId, ref: "Attachment" },
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
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  postmeta: [ postmetaSchema ],
  ...baseSchema.obj
}, baseSchemaOptions );

postSchema.statics.build = ( attrs: PostAttrs ) => {
  return new Post( attrs );
};

postSchema.virtual( 'reviews', {
  ref: 'PostReview',
  localField: '_id',
  foreignField: 'post'
} );

postSchema.virtual( 'likes', {
  ref: 'PostLike',
  localField: '_id',
  foreignField: 'post'
} );

postSchema.virtual( 'numLikes', {
  ref: 'PostLike',
  localField: '_id',
  foreignField: 'post',
  count: true
} );

const Post = model<PostDoc, PostModel>( "Post", postSchema );

export { Post };