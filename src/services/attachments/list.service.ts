import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { docListGenerator, IListQueryPreDefinedFilters, IListQueryPreDefinedOrders } from "infrastructure/service-utils/doc-list-generator";
import { Attachment } from "models/attachments/attachment.model";
import { ParsedQs } from 'qs';

export interface IAttachmentListService {
  fieldsToExclude?: string[];
  query?: ParsedQs;
  preDefinedFilters?: IListQueryPreDefinedFilters[];
  preDefinedOrders?: IListQueryPreDefinedOrders[];
}

export async function attachmentListService ( params: IAttachmentListService ) {
  const { fieldsToExclude, query, preDefinedFilters, preDefinedOrders } = params;
  const result = await docListGenerator( {
    fieldsToExclude,
    model: Attachment,
    queryStringParams: query,
    cache: {
      useCache: true,
      cacheOptionService: CacheOptionServiceEnum.ATTACHMENT
    },
    preDefinedFilters,
    preDefinedOrders
  } );
  return result;
}