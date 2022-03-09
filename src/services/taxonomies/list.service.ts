import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { docListGenerator } from "infrastructure/service-utils/doc-list-generator";
import { Taxonomy } from "models/taxonomies/taxonomy.model";
import { ParsedQs } from 'qs';

export async function taxonomyListService ( query: ParsedQs ) {
  const result = await docListGenerator( {
    fieldsToExclude: [],
    model: Taxonomy,
    queryStringParams: query,
    cache: {
      useCache: true,
      cacheOptionService: CacheOptionServiceEnum.TAXONOMY
    }
  } );
  return result;
}