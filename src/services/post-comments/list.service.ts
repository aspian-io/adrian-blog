import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { docListGenerator, IListQueryPreDefinedFilters, IListQueryPreDefinedOrders } from "infrastructure/service-utils/doc-list-generator";
import { Comment } from "models/post-comments/post-comment.model";
import { ParsedQs } from 'qs';
import { PostCommentDto } from "./DTOs/post-comment.dto";

export interface IPostCommentListService {
  fieldsToExclude?: string[];
  query?: ParsedQs;
  preDefinedFilters?: IListQueryPreDefinedFilters[];
  preDefinedOrders?: IListQueryPreDefinedOrders[];
  dataMapTo?: new () => PostCommentDto;
}

export async function postCommentListService ( params: IPostCommentListService ) {
  const { fieldsToExclude, query, preDefinedFilters, preDefinedOrders, dataMapTo } = params;
  const result = await docListGenerator( {
    fieldsToExclude,
    model: Comment,
    queryStringParams: query,
    cache: {
      useCache: true,
      cacheOptionService: CacheOptionServiceEnum.POST_COMMENT
    },
    preDefinedFilters,
    preDefinedOrders,
    dataMapTo
  } );
  return result;
}