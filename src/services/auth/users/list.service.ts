import { IImgProxyPrams, imgProxySignUrl } from "infrastructure/imgproxy/sign-url";
import { WithImgProxyUrlType } from "infrastructure/imgproxy/type";
import { docListGenerator, IListQueryPreDefinedFilters, IListQueryPreDefinedOrders } from "infrastructure/service-utils/doc-list-generator";
import { User, UserDoc } from "models/auth/auth-user.model";
import { PopulateOptions } from "mongoose";
import { ParsedQs } from 'qs';

export interface IUserListService {
  fieldsToExclude?: string[];
  query?: ParsedQs;
  preDefinedFilters?: IListQueryPreDefinedFilters[];
  preDefinedOrders?: IListQueryPreDefinedOrders[];
  fieldsToPopulate?: string[] | PopulateOptions | PopulateOptions[];
  imgProxyParams?: Omit<IImgProxyPrams, "key">;
}

export async function authUserListService ( params: IUserListService ) {
  const { fieldsToExclude, query, preDefinedFilters, preDefinedOrders, imgProxyParams, fieldsToPopulate } = params;
  const result = await docListGenerator( {
    fieldsToExclude,
    model: User,
    queryStringParams: query,
    preDefinedFilters,
    preDefinedOrders,
    fieldsToPopulate
  } );

  if ( imgProxyParams?.resizingType ) {
    const processedData = result.data.map( d => {
      let userDoc: WithImgProxyUrlType<UserDoc> = d as UserDoc;
      if ( userDoc && userDoc.avatar ) {
        const imgProxySignedUrl = imgProxySignUrl( { ...imgProxyParams, key: userDoc.avatar.path } );
        userDoc = { ...userDoc, imgProxySignedUrl };
      }
      return userDoc;
    } );
    result.data = processedData as any;
  }

  return result;
}