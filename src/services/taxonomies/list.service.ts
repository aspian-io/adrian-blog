import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { IImgProxyPrams, imgProxySignUrl } from "infrastructure/imgproxy/sign-url";
import { WithImgProxyUrlType } from "infrastructure/imgproxy/type";
import { docListGenerator, IListQueryPreDefinedFilters, IListQueryPreDefinedOrders } from "infrastructure/service-utils/doc-list-generator";
import { Taxonomy, TaxonomyDoc } from "models/taxonomies/taxonomy.model";
import { ParsedQs } from 'qs';
import { TaxonomyDto } from "./DTOs/taxonomy.dto";

export interface ITaxonomyListService {
  query: ParsedQs;
  preDefinedFilters?: IListQueryPreDefinedFilters[];
  preDefinedOrders?: IListQueryPreDefinedOrders[];
  dataMapTo?: new () => TaxonomyDto;
  imgProxyParams?: Omit<IImgProxyPrams, "key">;
}

export async function taxonomyListService ( params: ITaxonomyListService ) {
  const { query, preDefinedFilters, dataMapTo, imgProxyParams } = params;
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
  if ( imgProxyParams?.resizingType ) {
    const processedData = result.data.map( d => {
      let taxonomyDoc: WithImgProxyUrlType<TaxonomyDoc | TaxonomyDto> = dataMapTo ?  d as TaxonomyDto : d as TaxonomyDoc;
      if ( taxonomyDoc.featuredImage && taxonomyDoc.featuredImage.path ) {
        const imgProxySignedUrl = imgProxySignUrl( { ...imgProxyParams, key: taxonomyDoc.featuredImage.path } );
        taxonomyDoc = { ...taxonomyDoc, imgProxySignedUrl };
      }
      return taxonomyDoc;
    } );
    result.data = processedData as any;
  }
  return result;
}