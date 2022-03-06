import { Request, Response } from "express";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer.infra";
import { authChangePasswordService } from "services/auth/users/change-password.service";
import { logger } from "services/winston-logger/logger.service";

export async function authChangePasswordController ( req: Request, res: Response ) {
  const userId = req.currentUser!.id;
  const updatedBy = req.currentUser!.id;
  const updatedByIp = req.ip;
  const userAgent = req.get( 'User-Agent' ) ?? 'unknown-agent';

  const user = await authChangePasswordService( {
    ...req.body,
    userId,
    updatedBy,
    updatedByIp,
    userAgent
  } );

  res.status( 200 ).send( {} );
  logger.info(
    `${ req.currentUser!.email } password changed`,
    logSerializer( req, res, AuthLocaleEnum.INFO_CHANGE_PASSWORD, { user: { id: user.id } } )
  );
}