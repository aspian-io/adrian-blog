import { Request } from "express";
import { Activity } from "../../models/activities/activity.model";

export async function activityListService ( req: Request ) {
  const activities = await Activity.find( {} ).sort( { createdAt: 'desc' } );
  if ( activities.length ) {
    activities.forEach( a => {
      if ( a.localizedMsgKey ) a.localizedMsgKey = req.t( a.localizedMsgKey );
    } );
  }
  return activities;
}