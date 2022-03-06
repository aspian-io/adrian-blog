import { Request, Response } from "express";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer.infra";
import { AuthViewProfileDto } from "services/auth/DTOs/view-profile.dto";
import { authSendEmailVerificationLinkService } from "services/auth/users/send-email-verification-link.service";
import { logger } from "services/winston-logger/logger.service";

export async function authEmailConfirmationLinkController ( req: Request, res: Response ) {
  const user = await authSendEmailVerificationLinkService( req.currentUser!.id );

  const profileDto = new AuthViewProfileDto( user );
  res.send( profileDto );
  logger.info(
    `Email confirmation link has been sent to ${ user.email }`,
    logSerializer( req, res, AuthLocaleEnum.INFO_EMAIL_CONFIRMATION_LINK_SENT, { user: { id: user.id } } )
  );
}