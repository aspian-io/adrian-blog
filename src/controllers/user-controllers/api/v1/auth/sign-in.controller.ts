import { Request, Response } from 'express';
import { logger } from 'services/winston-logger/logger.service';
import { logSerializer } from 'infrastructure/serializers/log-serializer';
import { authSignInService } from 'services/auth/users/sign-in.service';
import { AuthLocaleEnum } from 'infrastructure/locales/service-locale-keys/auth.locale';
import { setRefreshTokenCookie } from 'infrastructure/security/set-refresh-token-cookie';

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

  setRefreshTokenCookie( res, refreshToken );
  res.status( 200 ).send( {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    jwtToken: user.jwtToken
  } );

  logger.info(
    `${ user.email } signed-in successfully`,
    logSerializer( req, res, AuthLocaleEnum.INFO_SIGNIN, {
      user: {
        id: user.id
      }
    } )
  );
};
