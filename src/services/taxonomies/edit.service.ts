import slugify from "slugify";
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
  children?: string[];
  updatedBy: string;
  updatedByIp: string;
  userAgent: string;
}

export async function taxonomyEditService ( data: ITaxonomyEditService ) {
  const { slug, type, description, term, parent, children, updatedBy, updatedByIp, userAgent } = data;
  const taxonomy = await Taxonomy.findOne( { slug } );
  const slugified = slugify( term );

  if ( !taxonomy ) {
    throw new NotFoundError();
  }

  const duplicateTaxonomies = await Taxonomy.find( { type, term } );
  if ( duplicateTaxonomies.length ) {
    duplicateTaxonomies.forEach( t => {
      if ( t.slug !== slug ) {
        throw new BadRequestError( "Duplicated taxonomy is not allowed", TaxonomyLocaleEnum.ERROR_DUPLICATE_TAXONOMY );
      }
    } );
  }

  taxonomy.set( {
    type,
    description,
    term,
    parent,
    children,
    slug: slugified,
    updatedBy,
    updatedByIp,
    userAgent
  } );
  await taxonomy.save();
  clearCache( CacheOptionAreaEnum.ADMIN, CacheOptionServiceEnum.TAXONOMY );
  return taxonomy;
}