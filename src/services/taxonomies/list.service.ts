import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options.infra";
import { Taxonomy } from "models/taxonomies/taxonomy.model";

export async function taxonomyListService () {
  const taxonomies = await Taxonomy.find()
    .sort( { createdAt: "desc" } )
    .cache( CacheOptionServiceEnum.TAXONOMY );
  return taxonomies;
}