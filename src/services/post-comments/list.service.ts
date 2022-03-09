import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { docListGenerator } from "infrastructure/service-utils/doc-list-generator";
import { Comment } from "models/post-comments/post-comment.model";
import { ParsedQs } from 'qs';

export async function postCommentListService ( query: ParsedQs ) {
  const result = await docListGenerator( {
    fieldsToExclude: [],
    model: Comment,
    queryStringParams: query,
    cache: {
      useCache: true,
      cacheOptionService: CacheOptionServiceEnum.POST_COMMENT
    }
  } );
  return result;
}