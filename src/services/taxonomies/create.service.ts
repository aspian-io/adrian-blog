import { Taxonomy, TaxonomyTypeEnum } from "models/taxonomies/taxonomy.model";
import mongoose from 'mongoose';
import slugify from "slugify";
import { clearCache } from "infrastructure/cache/clear-cache.infra";
import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options.infra";
import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { CoreLocaleEnum } from "infrastructure/locales/service-locale-keys/core.locale";
import { TaxonomyLocaleEnum } from "infrastructure/locales/service-locale-keys/taxonomies.locale";

export interface ITaxonomyCreateService {
  type: TaxonomyTypeEnum;
  description: string;
  term: string;
  parent?: string;
  createdBy: string;
  createdByIp: string;
  userAgent: string;
}

export async function taxonomyCreateService ( data: ITaxonomyCreateService ) {
  const { type, description, term, parent, createdBy, createdByIp, userAgent } = data;
  if ( !mongoose.isValidObjectId( createdBy ) ) throw new BadRequestError( "User id must be a standard id", CoreLocaleEnum.ERROR_USER_ID );
  const slug = slugify( term );

  const taxonomy = Taxonomy.build( { type, description, term, slug, parent, createdBy, createdByIp, userAgent } );
  if ( !mongoose.isValidObjectId( parent ) ) {
    throw new BadRequestError( "Something went wrong with parent taxonomy", CoreLocaleEnum.ERROR_400_MSG );
  }
  const parentTaxonomy = parent
    ? await Taxonomy.findById( parent )
    : null;
  if ( parent && !parentTaxonomy ) {
    throw new BadRequestError( "Something went worng getting parent taxonomy", CoreLocaleEnum.ERROR_400_MSG );
  }

  const isDuplicated = await Taxonomy.find( { type, term } );
  if ( isDuplicated.length ) {
    throw new BadRequestError( "Duplicate taxonomy is not allowed", TaxonomyLocaleEnum.ERROR_DUPLICATE_TAXONOMY );
  }

  const session = await mongoose.startSession(); // Transaction session started
  session.startTransaction();
  await taxonomy.save( { session } );
  if ( parentTaxonomy ) {
    parentTaxonomy.set( {
      children: parentTaxonomy.children ? [ ...parentTaxonomy.children, taxonomy.id ] : [ taxonomy.id ]
    } );
    await parentTaxonomy.save( { session } );
  }
  clearCache( CacheOptionServiceEnum.TAXONOMY );
  await session.commitTransaction();
  session.endSession(); // Transaction session ended

  return taxonomy;
}