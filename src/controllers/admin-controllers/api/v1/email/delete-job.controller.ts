import { Request, Response } from "express";
import { EmailLocaleEnum } from "infrastructure/locales/service-locale-keys/email.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { emailDeleteJobService } from "services/email/delete-job.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminEmailDeleteJobController ( req: Request, res: Response ) {
  const job = await emailDeleteJobService( req.params.jobId );
  res.send( job );
  logger.info(
    `The admin <${ req.currentUser!.email }> deleted the sending email job 'id: ${ req.body.jobId }' successfully`,
    logSerializer( req, res, EmailLocaleEnum.INFO_DELETE_JOB )
  );
}