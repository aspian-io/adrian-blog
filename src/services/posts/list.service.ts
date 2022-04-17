import { IImgProxyPrams, imgProxySignUrl } from "infrastructure/imgproxy/sign-url";
import { WithImgProxyUrlType } from "infrastructure/imgproxy/type";
import { docListGenerator, IListQueryPreDefinedFilters, IListQueryPreDefinedOrders, IListQueryResult } from "infrastructure/service-utils/doc-list-generator";
import { Post, PostDoc } from "models/posts/post.model";
import { PopulateOptions } from "mongoose";
import { ParsedQs } from 'qs';
import { PostDto } from "./DTOs/post.dto";

export interface IPostListService {
  fieldsToExclude?: string[];
  query?: ParsedQs;
  preDefinedFilters?: IListQueryPreDefinedFilters[];
  preDefinedOrders?: IListQueryPreDefinedOrders[];
  fieldsToPopulate?: string[] | PopulateOptions | PopulateOptions[];
  dataMapTo?: new () => PostDto;
  imgProxyParams?: Omit<IImgProxyPrams, "key">;
}

export async function postListService ( params: IPostListService ) {
  const { fieldsToExclude, query, preDefinedFilters, preDefinedOrders, fieldsToPopulate, dataMapTo, imgProxyParams } = params;
  const result = await docListGenerator( {
    fieldsToExclude,
    model: Post,
    queryStringParams: query,
    preDefinedFilters,
    preDefinedOrders,
    fieldsToPopulate,
    dataMapTo
  } );
  if ( imgProxyParams?.resizingType ) {
    const processedData = result.data.map( d => {
      let postDoc: WithImgProxyUrlType<PostDoc | PostDto> = dataMapTo ? d as PostDto : d as PostDoc;
      if ( postDoc.featuredImage && postDoc.featuredImage.path ) {
        const imgProxySignedUrl = imgProxySignUrl( { ...imgProxyParams, key: postDoc.featuredImage.path } );
        postDoc = { ...postDoc, imgProxySignedUrl };
      }
      return postDoc;
    } );
    result.data = processedData as any;
  }
  return result;
}