import chalk from "chalk";
import { Request, Response } from "express";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { logSerializer } from "infrastructure/serializers/log-serializer.infra";
import { authSetSuspendUserService } from "services/auth/users/set-suspend-user.service";
import { logger } from "services/winston-logger/logger.service";

export async function adminAuthSetSuspendUserController ( req: Request, res: Response ) {
  const userId = req.params.userId;
  const isSuspended = req.body.isSuspended;
  const updatedBy = req.currentUser!.id;
  const updatedByIp = req.ip;
  const userAgent = req.get( 'User-Agent' ) ?? 'unknown_agent';
  const user = await authSetSuspendUserService( {
    userId,
    isSuspended,
    updatedBy,
    updatedByIp,
    userAgent
  } );

  res.send( user );
  logger.info(
    `User ${ user.email } ${ isSuspended ? chalk.underline.red( 'suspended' ) : chalk.underline.green( 'unsuspended' ) }successfully`,
    logSerializer( req, res, isSuspended ? AuthLocaleEnum.INFO_USER_SUSPENDED : AuthLocaleEnum.INFO_USER_UNSUSPENDED, {
      user: {
        id: user.id
      }
    } )
  );
}