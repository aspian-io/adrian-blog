import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { docListGenerator, IListQueryPreDefinedFilters, IListQueryPreDefinedOrders } from "infrastructure/service-utils/doc-list-generator";
import { Taxonomy } from "models/taxonomies/taxonomy.model";
import { ParsedQs } from 'qs';
import { TaxonomyDto } from "./DTOs/taxonomy.dto";

export interface ITaxonomyListService {
  query: ParsedQs;
  preDefinedFilters?: IListQueryPreDefinedFilters[];
  preDefinedOrders?: IListQueryPreDefinedOrders[];
  dataMapTo?: new () => TaxonomyDto;
}

export async function taxonomyListService ( params: ITaxonomyListService ) {
  const { query, preDefinedFilters, dataMapTo } = params;
  const result = await docListGenerator( {
    fieldsToExclude: [],
    model: Taxonomy,
    queryStringParams: query,
    cache: {
      useCache: true,
      cacheOptionService: CacheOptionServiceEnum.TAXONOMY
    },
    preDefinedFilters,
    dataMapTo
  } );
  return result;
}