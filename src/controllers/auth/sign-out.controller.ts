import { Request, Response } from 'express';
import { logSerializer } from '../../helpers/log-serializer.helper';
import { AuthLocaleEnum } from '../../locales/service-locale-keys/auth.locale';
import { revokeTokenService } from '../../services/auth/revoke-token.service';
import { logger } from '../../services/winston-logger/logger.service';

export async function signoutController ( req: Request, res: Response ) {
  const token = req.cookies.refreshToken;
  const ipAddress = req.ip;
  await revokeTokenService( { token, ipAddress } );
  res.clearCookie( 'refreshToken' );
  res.status( 200 ).send( {} );
  logger.info( "User signed out successfully", logSerializer( req, res, AuthLocaleEnum.INFO_SIGNOUT ) );
};
