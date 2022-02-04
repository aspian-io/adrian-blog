import mongoose, { Model, Schema, Document, model } from 'mongoose';
import { BaseAttrs, BaseDoc, baseSchema, baseSchemaOptions } from './base.model';
import { PostDoc } from './post.model';

export enum TaxonomyTypeEnum {
  NAV_MENU = "NAV_MENU",
  CATEGORY = "CATEGORY",
  TAG = "TAG"
}

export interface TaxonomyAttrs extends BaseAttrs {
  type: TaxonomyTypeEnum;
  description: string;
  term: string;
  slug: string;
  posts?: string[];
  parent?: string;
  children?: string[];
}

export interface TaxonomyDoc extends BaseDoc, Document {
  type: TaxonomyTypeEnum;
  description: string;
  term: string;
  slug: string;
  posts?: PostDoc[];
  parent: TaxonomyDoc;
  children: TaxonomyDoc[];
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
  parent: { type: Schema.Types.ObjectId, ref: "Taxonomy" },
  children: [ { type: Schema.Types.ObjectId, ref: "Taxonomy" } ],
  ...baseSchema.obj
}, baseSchemaOptions );

taxonomySchema.statics.build = ( attrs: TaxonomyAttrs ) => {
  return new Taxonomy( attrs );
};

// const autoPopulate = function (
//   this: mongoose.Query<any, any, {}, any>,
//   next: ( err?: mongoose.CallbackError | undefined ) => void
// ) {
//   this.populate( "parent" ).populate( "children" );
//   next();
// };

// taxonomySchema.pre( "findOne", autoPopulate );
// taxonomySchema.pre( "find", autoPopulate );

export const Taxonomy = model<TaxonomyDoc, TaxonomyModel>( 'Taxonomy', taxonomySchema );
