import { Request, Response } from "express";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer.infra";
import { authPasswordResetService } from "services/auth/users/password-reset.service";
import { logger } from "services/winston-logger/logger.service";

export async function authResetPasswordController ( req: Request, res: Response ) {
  const userId = req.params.userId;
  const resetToken = req.params.resetToken;
  const newPassword = req.body.password;
  const ipAddress = req.ip;
  const userAgent = req.get( 'User-Agent' ) ?? "unknown_agent";

  const user = await authPasswordResetService( { userId, resetToken, newPassword, ipAddress, userAgent } );

  res.status( 200 ).send( {} );
  logger.info(
    `${ user.email } password reset successfully`,
    logSerializer( req, res, AuthLocaleEnum.INFO_PASSWORD_RESET, { user: { id: user.id } } )
  );
}