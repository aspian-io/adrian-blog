import { Taxonomy } from "models/taxonomies/taxonomy.model";
import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { NotFoundError } from "infrastructure/errors/not-found-error";

export async function taxonomyDetailsService ( slug: string ) {
  const taxonomy = await Taxonomy.findOne( { slug } )
    .cache( CacheOptionServiceEnum.TAXONOMY );
  if ( !taxonomy ) {
    throw new NotFoundError();
  }
  return taxonomy;
}