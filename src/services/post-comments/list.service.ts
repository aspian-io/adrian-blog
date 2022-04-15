import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { IImgProxyPrams, imgProxySignUrl } from "infrastructure/imgproxy/sign-url";
import { WithImgProxyUrlType } from "infrastructure/imgproxy/type";
import { docListGenerator, IListQueryPreDefinedFilters, IListQueryPreDefinedOrders } from "infrastructure/service-utils/doc-list-generator";
import { IDtoMapperOption } from "infrastructure/service-utils/dto-mapper";
import { Comment, CommentDoc } from "models/post-comments/post-comment.model";
import { PopulateOptions } from "mongoose";
import { ParsedQs } from 'qs';
import { PostCommentDto } from "./DTOs/post-comment.dto";

export interface IPostCommentListService {
  fieldsToExclude?: string[];
  query?: ParsedQs;
  preDefinedFilters?: IListQueryPreDefinedFilters[];
  preDefinedOrders?: IListQueryPreDefinedOrders[];
  dataMapTo?: new () => PostCommentDto;
  fieldsToPopulate?: string[] | PopulateOptions | PopulateOptions[];
  imgProxyParams?: Omit<IImgProxyPrams, "key">;
}

export async function postCommentListService ( params: IPostCommentListService ) {
  const {
    fieldsToExclude,
    query,
    preDefinedFilters,
    preDefinedOrders,
    dataMapTo,
    fieldsToPopulate,
    imgProxyParams
  } = params;
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
    fieldsToPopulate,
    dataMapTo,
  } );
  if ( imgProxyParams?.resizingType ) {
    const processedData = result.data.map( d => {
      let commentDoc: WithImgProxyUrlType<CommentDoc> = d as CommentDoc;
      if ( commentDoc.createdBy && commentDoc.createdBy.avatar ) {
        const imgProxySignedUrl = imgProxySignUrl( { ...imgProxyParams, key: commentDoc.createdBy.avatar.path } );
        commentDoc = { ...commentDoc, imgProxySignedUrl };
      }
      return commentDoc;
    } );
    result.data = processedData as any;
  }
  return result;
}