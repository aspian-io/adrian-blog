import { Request, Response } from "express";
import { ActivityLocaleEnum } from "infrastructure/locales/service-locale-keys/activities.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { activityListService } from "services/activities/list.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminActivityListController ( req: Request, res: Response ) {
  const activities = await activityListService( {
    t: req.t,
    query: req.query,
    fieldsToExclude: [ "localizedMsgKey", "message" ],
    preDefinedOrders: [ {
      orderBy: "createdAt",
      orderParam: -1
    } ]
  } );
  res.send( activities );
  logger.info(
    `Admin <${ req.currentUser!.email }> gets list of activities`,
    logSerializer( req, res, ActivityLocaleEnum.INFO_LIST, { user: { id: req.currentUser!.id } } )
  );
}