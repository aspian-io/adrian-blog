import { Request, Response } from "express";
import { EmailLocaleEnum } from "infrastructure/locales/service-locale-keys/email.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { bulkEmailToUsersService } from "services/email/bulk-email-to-users.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminEmailSendByTemplateController ( req: Request, res: Response ) {
  await bulkEmailToUsersService( req.body.userIds, req.body.emailTemplateId, req.body.subject, req.body.scheduledISODate );
  res.status( 200 ).send( {} );
  logger.info(
    `The admin <${ req.currentUser!.email }> sends email to users by using template`,
    logSerializer( req, res, EmailLocaleEnum.INFO_SEND_BY_TEMPLATE )
  );
}