import { Request } from "express";
import { docListGenerator } from "infrastructure/service-utils/doc-list-generator";
import { Activity } from "models/activities/activity.model";

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