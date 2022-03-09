import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { docListGenerator } from "infrastructure/service-utils/doc-list-generator";
import { Attachment } from "models/attachments/attachment.model";
import { ParsedQs } from 'qs';

export async function attachmentListService ( query: ParsedQs ) {
  const result = await docListGenerator( {
    fieldsToExclude: [],
    model: Attachment,
    queryStringParams: query,
    cache: {
      useCache: true,
      cacheOptionService: CacheOptionServiceEnum.ATTACHMENT
    }
  } );
  return result;
}