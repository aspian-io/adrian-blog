import { Request, Response } from 'express';
import { setTokenCookie } from '../../helpers/cookie.helper';
import { logSerializer } from '../../helpers/log-serializer.helper';
import { AuthLocaleEnum } from '../../locales/service-locale-keys/auth.locale';
import { registerService } from '../../services/auth/register.service';
import { logger } from '../../services/winston-logger/logger.service';

export async function signupController ( req: Request, res: Response ) {
  const { firstName, lastName, email, password } = req.body;
  const ipAddress = req.ip;
  const userAgent = req.get( 'User-Agent' ) ?? "unknown_agent";
  const { refreshToken, ...user } = await registerService( { firstName, lastName, email, password, ipAddress, userAgent } );
  setTokenCookie( res, refreshToken );
  res.status( 201 ).send( user );
  logger.info( "User signed up successfully", logSerializer( req, res, AuthLocaleEnum.INFO_SIGNUP ) );
};
