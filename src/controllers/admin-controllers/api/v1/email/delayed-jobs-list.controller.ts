import { Request, Response } from "express";
import { EmailLocaleEnum } from "infrastructure/locales/service-locale-keys/email.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { emailDelayedJobsListService } from "services/email/delayed-jobs-list.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminEmailDelayedJobsListController ( req: Request, res: Response ) {
  const jobsList = await emailDelayedJobsListService( req.body.page, req.body.size );
  res.send( jobsList );
  logger.info(
    `The admin <${ req.currentUser!.email }> retrieved list of delayed sending email jobs successfully`,
    logSerializer( req, res, EmailLocaleEnum.INFO_JOBS_DELAYED_LIST )
  );
}