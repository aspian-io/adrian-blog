import mongoose from "mongoose";
import slugify from "slugify";
import { CacheOptionServiceEnum } from 'infrastructure/cache/cache-options';
import { clearCache } from 'infrastructure/cache/clear-cache';
import { Taxonomy, TaxonomyTypeEnum } from "models/taxonomies/taxonomy.model";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { TaxonomyLocaleEnum } from "infrastructure/locales/service-locale-keys/taxonomies.locale";
import { LangEnum } from "infrastructure/locales/i18next-config";

export interface ITaxonomyEditService {
  lang: LangEnum;
  slug: string;
  type: TaxonomyTypeEnum;
  description: string;
  term: string;
  parent?: string;
  updatedBy: string;
  updatedByIp: string;
  userAgent: string;
}

export async function taxonomyEditService ( data: ITaxonomyEditService ) {
  const { lang, slug, type, description, term, parent, updatedBy, updatedByIp, userAgent } = data;
  const taxonomy = await Taxonomy.findOne( { slug } );
  const slugified = slugify( term );

  if ( !taxonomy ) {
    throw new NotFoundError();
  }

  const oldParent = taxonomy.parent ? taxonomy.parent.toString() : null;
  const parentDoc = parent ? await Taxonomy.findById( parent ) : null;
  if ( parent && !parentDoc ) {
    throw new BadRequestError( "Parent taxonomy not found", TaxonomyLocaleEnum.ERROR_PARENT_NOT_FOUND );
  }

  const duplicateTaxonomy = await Taxonomy.findOne( { type, term, id: { $ne: taxonomy.id } } );
  if ( duplicateTaxonomy ) {
    throw new BadRequestError( "Duplicated taxonomy is not allowed", TaxonomyLocaleEnum.ERROR_DUPLICATE_TAXONOMY );
  }

  taxonomy.set( {
    lang,
    type,
    description,
    term,
    parent,
    slug: slugified,
    updatedBy,
    updatedByIp,
    userAgent
  } );

  const session = await mongoose.startSession(); // Transaction session started
  session.startTransaction();
  await taxonomy.save( { session } );
  if ( oldParent && oldParent !== parent ) {
    await Taxonomy.updateOne( { _id: oldParent }, {
      $pullAll: {
        children: [ { _id: taxonomy.id } ]
      }
    }, { session } );
  }
  if ( parentDoc && !parentDoc.children.includes( taxonomy.id ) ) {
    parentDoc.set( {
      children: parentDoc.children ? [ ...parentDoc.children, taxonomy.id ] : [ taxonomy.id ]
    } );
    await parentDoc.save( { session } );
  }
  clearCache( CacheOptionServiceEnum.TAXONOMY );
  await session.commitTransaction();
  session.endSession(); // Transaction session ended
  return taxonomy;
}