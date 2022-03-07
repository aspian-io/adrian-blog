import { Request, Response } from 'express';
import { logger } from 'services/winston-logger/logger.service';
import { logSerializer } from 'infrastructure/serializers/log-serializer.infra';
import { authSignInService } from 'services/auth/users/sign-in.service';
import { setTokenCookie } from 'infrastructure/security/cookie.infra';
import { AuthLocaleEnum } from 'infrastructure/locales/service-locale-keys/auth.locale';

export async function authSigninController ( req: Request, res: Response ) {
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
  res.status( 200 ).send( {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    jwtToken: user.jwtToken
  } );

  logger.info(
    "user successfully signed-in",
    logSerializer( req, res, AuthLocaleEnum.INFO_SIGNIN, {
      user: {
        id: user.id
      }
    } )
  );
};
