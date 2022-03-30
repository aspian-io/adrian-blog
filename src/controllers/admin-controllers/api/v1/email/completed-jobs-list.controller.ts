import { Request, Response } from "express";
import { EmailLocaleEnum } from "infrastructure/locales/service-locale-keys/email.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { emailCompletedJobsListService } from "services/email/completed-jobs-list.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminEmailCompletedJobsListController ( req: Request, res: Response ) {
  const jobsList = await emailCompletedJobsListService( req.body.page, req.body.size );
  res.send( jobsList );
  logger.info(
    `The admin <${ req.currentUser!.email }> retrieved list of completed sending email jobs successfully`,
    logSerializer( req, res, EmailLocaleEnum.INFO_JOBS_COMPLETED_LIST )
  );
}