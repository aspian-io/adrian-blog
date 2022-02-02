import { Request, Response } from "express";
import { logSerializer } from "../../helpers/log-serializer.helper";
import { ActivityLocaleEnum } from "../../locales/service-locale-keys/activities.locale";
import { activityListService } from "../../services/activities/list.service";
import { logger } from "../../services/winston-logger/logger.service";

export async function activityListController ( req: Request, res: Response ) {
  const activities = await activityListService( req );
  res.send( activities );
  logger.info( "User gets list of activities", logSerializer( req, res, ActivityLocaleEnum.INFO_LIST ) );
}