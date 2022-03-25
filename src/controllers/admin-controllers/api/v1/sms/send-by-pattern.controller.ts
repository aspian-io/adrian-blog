import { Request, Response } from "express";
import { SMSLocaleEnum } from "infrastructure/locales/service-locale-keys/sms.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { bulkSmsToUsersService } from "services/sms/bulk-sms-to-users.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminSmsSendByPatternController ( req: Request, res: Response ) {
  await bulkSmsToUsersService( req.body.userIds, req.body.smsTemplateId, req.body.scheduledISODate );
  res.status( 200 ).send( {} );
  logger.info(
    `The admin <${ req.currentUser!.email }> sends sms to users by using pattern`,
    logSerializer( req, res, SMSLocaleEnum.INFO_SEND_BY_PATTERN )
  );
}