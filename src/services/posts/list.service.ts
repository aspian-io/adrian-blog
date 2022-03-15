import { docListGenerator, IListQueryPreDefinedFilters, IListQueryPreDefinedOrders } from "infrastructure/service-utils/doc-list-generator";
import { Post } from "models/posts/post.model";
import { ParsedQs } from 'qs';
import { PostDto } from "./DTOs/post.dto";

export interface IPostListService {
  fieldsToExclude?: string[];
  query?: ParsedQs;
  preDefinedFilters?: IListQueryPreDefinedFilters[];
  preDefinedOrders?: IListQueryPreDefinedOrders[];
  dataMapTo?: new () => PostDto;
}

export async function postListService ( params: IPostListService ) {
  const { fieldsToExclude, query, preDefinedFilters, preDefinedOrders, dataMapTo } = params;
  const result = await docListGenerator( {
    fieldsToExclude,
    model: Post,
    queryStringParams: query,
    preDefinedFilters,
    preDefinedOrders,
    dataMapTo
  } );
  return result;
}