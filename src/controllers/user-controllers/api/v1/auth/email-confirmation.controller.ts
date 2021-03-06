import { Request, Response } from "express";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer";
import { dtoMapper } from "infrastructure/service-utils/dto-mapper";
import { UserDoc } from "models/auth/auth-user.model";
import { AuthViewProfileDto } from "services/auth/DTOs/view-profile.dto";
import { authConfirmEmailService } from "services/auth/users/confirm-email.service";
import { logger } from "services/winston-logger/logger.service";

export async function authEmailConfirmationController ( req: Request, res: Response ) {
  const user = await authConfirmEmailService( {
    userId: req.params.userId,
    verificationToken: req.params.verificationToken,
    ipAddress: req.ip,
    userAgent: req.get( 'User-Agent' ) || 'unknown_agent'
  } );

  const profileDto = dtoMapper( user, AuthViewProfileDto );
  res.send( profileDto );
  logger.info(
    `User's email address <${ user.email }> confirmed successfully`,
    logSerializer( req, res, AuthLocaleEnum.INFO_EMAIL_CONFIRMED, { user: { id: user.id } } )
  );
}