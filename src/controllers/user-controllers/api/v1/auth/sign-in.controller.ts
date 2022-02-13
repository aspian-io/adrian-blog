import { Request, Response } from 'express';
import { logger } from 'services/winston-logger/logger.service';
import { logSerializer } from 'helpers/log-serializer.helper';
import { AuthLocaleEnum } from 'locales/service-locale-keys/auth.locale';
import { authSignInService } from 'services/auth/users/sign-in.service';
import { setTokenCookie } from 'helpers/cookie.helper';

export async function signinController ( req: Request, res: Response ) {
  const { email, password } = req.body;
  const ipAddress = req.ip;
  const userAgent = req.get( 'User-Agent' ) ?? "unknown_agent";

  const { refreshToken, ...user } = await authSignInService( {
    userEmail: email,
    userPassword: password,
    userIpAddress: ipAddress,
    userAgent
  } );
  setTokenCookie( res, refreshToken );
  res.status( 200 ).send( user );
  logger.info( "user successfully signed-in", logSerializer( req, res, AuthLocaleEnum.INFO_SIGNIN ) );
};
