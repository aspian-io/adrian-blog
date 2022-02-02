import { CacheOptionAreaEnum, CacheOptionServiceEnum } from "../../infrastructure/cache/cache-options.infra";
import { Taxonomy } from "../../models/taxonomy.model";

export async function taxonomyListService () {
  const taxonomies = await Taxonomy.find().sort( { createdAt: "desc" } ).cache( CacheOptionAreaEnum.ADMIN, CacheOptionServiceEnum.TAXONOMY );
  return taxonomies;
}