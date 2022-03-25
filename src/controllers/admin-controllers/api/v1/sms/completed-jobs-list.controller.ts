import { Request, Response } from "express";
import { SMSLocaleEnum } from "infrastructure/locales/service-locale-keys/sms.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { smsCompletedJobsListService } from "services/sms/completed-jobs-list.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminSmsCompletedJobsListController ( req: Request, res: Response ) {
  const jobsList = await smsCompletedJobsListService( req.body.page, req.body.size );
  res.send( jobsList );
  logger.info(
    `The admin <${ req.currentUser!.email }> retrieved list of completed sending sms jobs successfully`,
    logSerializer( req, res, SMSLocaleEnum.INFO_JOBS_COMLETED_LIST )
  );
}