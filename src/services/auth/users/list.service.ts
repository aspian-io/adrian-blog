import { docListGenerator, IListQueryPreDefinedFilters, IListQueryPreDefinedOrders } from "infrastructure/service-utils/doc-list-generator";
import { User } from "models/auth/auth-user.model";
import { ParsedQs } from 'qs';

export interface IUserListService {
  fieldsToExclude?: string[];
  query?: ParsedQs;
  preDefinedFilters?: IListQueryPreDefinedFilters[];
  preDefinedOrders?: IListQueryPreDefinedOrders[];
}

export async function authUserListService ( params: IUserListService ) {
  const { fieldsToExclude, query, preDefinedFilters, preDefinedOrders } = params;
  const result = await docListGenerator( {
    fieldsToExclude,
    model: User,
    queryStringParams: query,
    preDefinedFilters,
    preDefinedOrders
  } );

  return result;
}