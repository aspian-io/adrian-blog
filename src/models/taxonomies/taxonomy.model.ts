import { LangEnum } from 'infrastructure/locales/i18next-config';
import { BaseAttrs, BaseDoc, baseSchema, baseSchemaOptions } from 'models/base/base.model';
import { Model, Schema, Document, model } from 'mongoose';

export enum TaxonomyTypeEnum {
  NAV_MENU = "NAV_MENU",
  CATEGORY = "CATEGORY",
  TAG = "TAG"
}

export interface TaxonomyAttrs extends BaseAttrs {
  lang: LangEnum;
  type: TaxonomyTypeEnum;
  description?: string;
  term: string;
  slug: string;
  parent?: string;
  children?: string[];
}

export interface TaxonomyDoc extends BaseDoc, Document {
  lang: LangEnum;
  type: TaxonomyTypeEnum;
  description: string;
  term: string;
  slug: string;
  parent?: TaxonomyDoc;
  children: TaxonomyDoc[];
}

interface TaxonomyModel extends Model<TaxonomyDoc> {
  build ( attrs: TaxonomyAttrs ): TaxonomyDoc;
}
const taxonomySchema = new Schema<TaxonomyDoc, TaxonomyModel>( {
  lang: { type: String, required: true, enum: Object.values( LangEnum ) },
  type: { type: String, required: true, enum: Object.values( TaxonomyTypeEnum ) },
  description: { type: String, required: false },
  term: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  parent: { type: Schema.Types.ObjectId, ref: "Taxonomy" },
  children: [ { type: Schema.Types.ObjectId, ref: "Taxonomy" } ],
  ...baseSchema.obj
}, baseSchemaOptions );

taxonomySchema.statics.build = ( attrs: TaxonomyAttrs ) => {
  return new Taxonomy( attrs );
};

export const Taxonomy = model<TaxonomyDoc, TaxonomyModel>( 'Taxonomy', taxonomySchema );
