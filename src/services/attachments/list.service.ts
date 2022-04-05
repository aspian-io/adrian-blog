import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { IImgProxyPrams, imgProxySignUrl } from "infrastructure/imgproxy/sign-url";
import { WithImgProxyUrlType } from "infrastructure/imgproxy/type";
import { docListGenerator, IListQueryPreDefinedFilters, IListQueryPreDefinedOrders } from "infrastructure/service-utils/doc-list-generator";
import { matchRules } from "infrastructure/string-utils/match-rules";
import { Attachment, AttachmentDoc } from "models/attachments/attachment.model";
import { ParsedQs } from 'qs';

export interface IAttachmentListService {
  fieldsToExclude?: string[];
  query?: ParsedQs;
  preDefinedFilters?: IListQueryPreDefinedFilters[];
  preDefinedOrders?: IListQueryPreDefinedOrders[];
  imgProxyParams?: Omit<IImgProxyPrams, "key">;
}

export async function attachmentListService ( params: IAttachmentListService ) {
  const { fieldsToExclude, query, preDefinedFilters, preDefinedOrders, imgProxyParams } = params;
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
  if ( imgProxyParams?.resizingType ) {
    const processedData = result.data.map( d => {
      let attachmentDoc: WithImgProxyUrlType<AttachmentDoc> = d as AttachmentDoc;
      if ( matchRules( attachmentDoc.type!, "image/*" ) ) {
        const imgProxySignedUrl = imgProxySignUrl( { ...imgProxyParams, key: attachmentDoc.path! } );
        attachmentDoc = { ...attachmentDoc, imgProxySignedUrl };
      }
      return attachmentDoc;
    } );
    result.data = processedData as any;
  }
  return result;
}