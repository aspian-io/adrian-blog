import slugify from "slugify";
import mongoose from 'mongoose';
import { BadRequestError } from "../../errors/bad-request-error";
import { NotFoundError } from "../../errors/not-found-error";
import { CacheOptionAreaEnum, CacheOptionServiceEnum } from '../../infrastructure/cache/cache-options.infra';
import { clearCache } from '../../infrastructure/cache/clear-cache.infra';
import { TaxonomyLocaleEnum } from '../../locales/service-locale-keys/taxonomies.locale';
import { Taxonomy, TaxonomyTypeEnum } from "../../models/taxonomies/taxonomy.model";

export interface ITaxonomyEditService {
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
  const { slug, type, description, term, parent, updatedBy, updatedByIp, userAgent } = data;
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

  const duplicateTaxonomies = await Taxonomy.find( { type, term } );
  if ( duplicateTaxonomies.length ) {
    duplicateTaxonomies.forEach( t => {
      if ( t.id !== taxonomy.id ) {
        throw new BadRequestError( "Duplicated taxonomy is not allowed", TaxonomyLocaleEnum.ERROR_DUPLICATE_TAXONOMY );
      }
    } );
  }

  taxonomy.set( {
    type,
    description,
    term,
    parent,
    slug: slugified,
    updatedBy,
    updatedByIp,
    userAgent
  } );
  await taxonomy.save();
  if ( oldParent && oldParent !== parent ) {
    await Taxonomy.updateOne( { _id: oldParent }, {
      $pullAll: {
        children: [ { _id: taxonomy.id } ]
      }
    } );
  }

  if ( parentDoc && !parentDoc.children.includes( taxonomy.id ) ) {
    parentDoc.set( {
      children: parentDoc.children ? [ ...parentDoc.children, taxonomy.id ] : [ taxonomy.id ]
    } );
    await parentDoc.save();
  }

  clearCache( CacheOptionAreaEnum.ADMIN, CacheOptionServiceEnum.TAXONOMY );
  return taxonomy;
}