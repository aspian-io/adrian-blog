import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { docListGenerator } from "infrastructure/service-utils/doc-list-generator";
import { Post, PostTypeEnum } from "models/posts/post.model";
import { ParsedQs } from 'qs';

export async function postListService ( query: ParsedQs ) {
  const result = await docListGenerator( {
    fieldsToExclude: [],
    model: Post,
    queryStringParams: query,
    cache: {
      useCache: true,
      cacheOptionService: CacheOptionServiceEnum.POST
    }
  } );
  return result;
}