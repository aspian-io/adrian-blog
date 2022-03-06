import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options.infra";
import { User } from "models/auth/auth-user.model";

export interface IAuthUserListParams {
  page: number;
  size: number;
  orderField?: string;
  orderParam?: number;
  filterField?: string;
  filterParam?: string;
}

// Filter Object Type
interface IFilterUserQuery {
  [ key: string ]: RegExp;
}

// Sort Object Type
interface ISortUserQuery {
  [ key: string ]: 1 | -1;
}


export async function authUserListService ( params: IAuthUserListParams ) {
  const { page, size, orderField, orderParam, filterField, filterParam } = params;
  const userModelKeys = [ ...Object.keys( User.schema.obj ), "createdAt", "updatedAt" ];
  const filterFieldVal = filterField && userModelKeys.includes( filterField ) ? filterField : '';
  const filterParamVal = filterParam ? filterParam.trim().toString() : '';
  const orderFieldVal = orderField && userModelKeys.includes( orderField ) ? orderField : "createdAt";
  const orderParamVal = ( orderParam !== 1 && orderParam !== -1 ) ? -1 : orderParam;
  const filter: IFilterUserQuery = {};
  if ( filterFieldVal && filterParamVal ) {
    filter[ filterFieldVal ] = new RegExp( filterParamVal, "i" );
  }
  const total = filter ? await User.find( filter ).count() : await User.count();
  let limit = 10;
  if ( size < 1 ) {
    limit = 1;
  } else if ( size > total ) {
    limit = total;
  } else {
    limit = size;
  }
  const totalPages = Math.ceil( total / limit );
  let pageVal = 1;
  if ( page < 1 ) {
    pageVal = 1;
  } else if ( page > totalPages ) {
    pageVal = totalPages;
  } else {
    pageVal = page;
  }
  const skip = ( pageVal - 1 ) * limit;

  const sort: ISortUserQuery = {};
  sort[ orderFieldVal ] = orderParamVal;

  const users = await User.find( filter, null, { skip, limit, sort } )
    .cache( CacheOptionServiceEnum.USER );

  return {
    page: pageVal,
    totalPages,
    total,
    numberPerPage: limit,
    resultNumber: users.length,
    users
  };
}