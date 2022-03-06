import { Request, Response } from "express";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer.infra";
import { authSendPassResetLinkService } from "services/auth/users/send-pass-reset-link.service";
import { logger } from "services/winston-logger/logger.service";

export async function authSendResetPassLinkController ( req: Request, res: Response ) {
  const email = req.body.email;

  const user = await authSendPassResetLinkService( email );

  res.clearCookie( 'refreshToken' );
  res.status( 200 ).send( {} );
  logger.info(
    `Reset password link has been sent to ${ email }`,
    logSerializer( req, res, AuthLocaleEnum.INFO_RESET_PASS_LINK_SENT, { user: { id: user.id } } )
  );
}