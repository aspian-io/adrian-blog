import { Activity } from "models/activities/activity.model";

export interface IActivityCreateService {
  level: string;
  method: string;
  url: string;
  status: number;
  responseTime?: number;
  userId?: string;
  userEmail?: string;
  userAgent?: string;
  message?: string;
  localizedMsgKey?: string;
  name?: string;
}

export async function activityCreateService ( data: IActivityCreateService ) {
  const activity = Activity.build( data );
  try {
    await activity.save();
  } catch ( err ) {
    console.log( "Something were wrong saving the activity from activity service", err );
  }
}