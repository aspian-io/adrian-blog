import { Request, Response } from "express";
import { ActivityLocaleEnum } from "infrastructure/locales/service-locale-keys/activities.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { activityListService } from "services/activities/list.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminActivityListController ( req: Request, res: Response ) {
  const activityListObj = await activityListService( req );
  res.send( activityListObj );
  logger.info(
    "User gets list of activities",
    logSerializer( req, res, ActivityLocaleEnum.INFO_LIST, { user: { id: req.currentUser!.id } } )
  );
}