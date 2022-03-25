import { Request, Response } from "express";
import { SMSLocaleEnum } from "infrastructure/locales/service-locale-keys/sms.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { smsDelayedJobsListService } from "services/sms/delayed-jobs-list.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminSmsDelayedJobsListController ( req: Request, res: Response ) {
  const jobsList = await smsDelayedJobsListService( req.body.page, req.body.size );
  res.send( jobsList );
  logger.info(
    `The admin <${ req.currentUser!.email }> retrieved list of delayed sending sms jobs successfully`,
    logSerializer( req, res, SMSLocaleEnum.INFO_JOBS_DELAYED_LIST )
  );
}