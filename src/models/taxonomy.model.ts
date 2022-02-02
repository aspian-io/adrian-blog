import { Model, Schema, Document, model } from 'mongoose';
import { BaseAttrs, BaseDoc, baseSchema, baseSchemaOptions } from './base.model';
import { PostDoc } from './post.model';

export enum TaxonomyTypeEnum {
  NAV_MENU = "NAV_MENU",
  CATEGORY = "CATEGORY",
  TAG = "TAG"
}

interface TaxonomyAttrs extends BaseAttrs {
  type: TaxonomyTypeEnum;
  description: string;
  term: string;
  slug: string;
  posts?: string[];
}

export interface TaxonomyDoc extends BaseDoc, Document {
  type: TaxonomyTypeEnum;
  description: string;
  term: string;
  slug: string;
  posts?: PostDoc[];
}

interface TaxonomyModel extends Model<TaxonomyDoc> {
  build ( attrs: TaxonomyAttrs ): TaxonomyDoc;
}
const taxonomySchema = new Schema<TaxonomyDoc, TaxonomyModel>( {
  type: { type: String, required: true, enum: Object.values( TaxonomyTypeEnum ) },
  description: { type: String, required: false },
  term: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  posts: [ { type: Schema.Types.ObjectId, ref: "Post" } ],
  ...baseSchema.obj
}, baseSchemaOptions );

taxonomySchema.statics.build = ( attrs: TaxonomyAttrs ) => {
  return new Taxonomy( attrs );
};

const Taxonomy = model<TaxonomyDoc, TaxonomyModel>( 'Taxonomy', taxonomySchema );

export { Taxonomy };
