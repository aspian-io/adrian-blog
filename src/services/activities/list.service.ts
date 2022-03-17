import { TFunction } from "i18next";
import { docListGenerator, IListQueryPreDefinedFilters, IListQueryPreDefinedOrders } from "infrastructure/service-utils/doc-list-generator";
import { Activity } from "models/activities/activity.model";
import { ParsedQs } from 'qs';

export interface IActivityListService {
  t: TFunction;
  fieldsToExclude?: string[];
  query?: ParsedQs;
  preDefinedFilters?: IListQueryPreDefinedFilters[];
  preDefinedOrders?: IListQueryPreDefinedOrders[];
}

export async function activityListService ( params: IActivityListService ) {
  const { fieldsToExclude, query, preDefinedFilters, preDefinedOrders, t } = params;
  const result = await docListGenerator( {
    fieldsToExclude,
    model: Activity,
    queryStringParams: query,
    preDefinedFilters,
    preDefinedOrders,
  } );

  if ( result.data.length ) {
    result.data.forEach( a => {
      if ( a.localizedMsgKey ) a.localizedMsgKey = t( a.localizedMsgKey );
    } );
  }
  return result;
}