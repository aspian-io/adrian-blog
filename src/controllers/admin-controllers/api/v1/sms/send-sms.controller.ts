import { Request, Response } from "express";
import { SMSLocaleEnum } from "infrastructure/locales/service-locale-keys/sms.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { sendSMS } from "services/sms/send-sms.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminSendSmsController ( req: Request, res: Response ) {
  await sendSMS( req.body.message, req.body.recipients );
  res.status( 200 ).send( {} );
  logger.info(
    `The admin <${ req.currentUser!.email }> sends sms manually`,
    logSerializer( req, res, SMSLocaleEnum.INFO_SEND_MANUALLY )
  );
}