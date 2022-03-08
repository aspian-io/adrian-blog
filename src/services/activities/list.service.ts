import { Request } from "express";
import { docListGenerator } from "infrastructure/service-utils/doc-list-generator";
import { Activity } from "models/activities/activity.model";

export interface IActivityListParams {
  page: number;
  size: number;
  orderBy?: string;
  orderParam?: number;
  filterBy?: string;
  filterParam?: string;
}

// Filter Object Type
interface IFilterActivityQuery {
  [ key: string ]: RegExp;
}

// Sort Object Type
interface ISortActivityQuery {
  [ key: string ]: 1 | -1;
}

export async function activityListService ( req: Request ) {
  const {
    list,
    numberPerPage,
    page,
    total,
    totalPages
  } = await docListGenerator( {
    fieldsToExclude: [],
    filterBy: req.query.filterBy,
    model: Activity,
    page: req.query.page ? parseInt( req.query.page.toString() ) : 1,
    queryStringParams: req.query,
    size: req.query.size ? parseInt( req.query.size.toString() ) : 10,
    orderBy: req.query.orderBy?.toString() || "createdAt",
    orderParam: req.query.orderParam ? parseInt( req.query.orderParam.toString() ) : -1
  } );

  if ( list.length ) {
    list.forEach( a => {
      if ( a.localizedMsgKey ) a.localizedMsgKey = req.t( a.localizedMsgKey );
    } );
  }
  return { list, numberPerPage, page, total, totalPages };
}