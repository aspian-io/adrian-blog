import { NotFoundError } from "../../errors/not-found-error";
import { Taxonomy } from "../../models/taxonomy.model";
import { CacheOptionAreaEnum, CacheOptionServiceEnum } from "../../infrastructure/cache/cache-options.infra";

export async function taxonomyDetailsService ( slug: string ) {
  const taxonomy = await Taxonomy.findOne( { slug } )
    .cache( CacheOptionAreaEnum.ADMIN, CacheOptionServiceEnum.TAXONOMY );
  if ( !taxonomy ) {
    throw new NotFoundError();
  }
  return taxonomy;
}