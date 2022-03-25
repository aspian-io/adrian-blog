import { Request, Response } from "express";
import { SMSLocaleEnum } from "infrastructure/locales/service-locale-keys/sms.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { smsDeleteJobService } from "services/sms/delete-job.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminSmsDeleteJobController ( req: Request, res: Response ) {
  const job = await smsDeleteJobService( req.params.jobId );
  res.send( job );
  logger.info(
    `The admin <${ req.currentUser!.email }> deleted the sending sms job 'id: ${ req.body.jobId }' successfully`,
    logSerializer( req, res, SMSLocaleEnum.INFO_DELETE_JOB )
  );
}