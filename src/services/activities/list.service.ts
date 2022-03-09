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
  const result = await docListGenerator( {
    fieldsToExclude: [ "localizedMsgKey", "message" ],
    model: Activity,
    queryStringParams: req.query,
  } );

  if ( result.data.length ) {
    result.data.forEach( a => {
      if ( a.localizedMsgKey ) a.localizedMsgKey = req.t( a.localizedMsgKey );
    } );
  }
  return result;
}