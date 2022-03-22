import { Request, Response } from "express";
import { EmailLocaleEnum } from "infrastructure/locales/service-locale-keys/email.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { emailSendService } from "services/email/send-an-email.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminSendEmailController ( req: Request, res: Response ) {
  await emailSendService( req.body.subject, req.body.content, req.body.to, req.body.from, req.body.cc, req.body.bcc );
  res.status( 200 ).send( {} );
  logger.info(
    `The admin <${ req.currentUser!.email }> sends an email to ${ req.body.to } successfully`,
    logSerializer( req, res, EmailLocaleEnum.INFO_SEND_ONE )
  );
}