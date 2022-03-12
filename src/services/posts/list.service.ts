import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { docListGenerator, IListQueryPreDefinedFilters } from "infrastructure/service-utils/doc-list-generator";
import { Post } from "models/posts/post.model";
import { ParsedQs } from 'qs';
import { PostDto } from "./DTOs/banner.dto";

export interface IPostListService {
  query: ParsedQs;
  preDefinedFilters?: IListQueryPreDefinedFilters[];
  dataMapTo?: new () => PostDto;
}

export async function postListService ( params: IPostListService ) {
  const { query, preDefinedFilters, dataMapTo } = params;
  const result = await docListGenerator( {
    fieldsToExclude: [],
    model: Post,
    queryStringParams: query,
    cache: {
      useCache: true,
      cacheOptionService: CacheOptionServiceEnum.POST
    },
    preDefinedFilters,
    dataMapTo
  } );
  return result;
}