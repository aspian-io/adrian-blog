import { Request, Response } from 'express';
import { AuthLocaleEnum } from 'infrastructure/locales/service-locale-keys/auth.locale';
import { logSerializer } from 'infrastructure/serializers/log-serializer';
import { authSignUpService } from 'services/auth/users/sign-up.service';
import { logger } from 'services/winston-logger/logger.service';

export async function authSignupController ( req: Request, res: Response ) {
  const ipAddress = req.ip;
  const userAgent = req.get( 'User-Agent' ) ?? "unknown_agent";
  const user = await authSignUpService( { ...req.body, ipAddress, userAgent } );
  res.status( 201 ).send( {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  } );
  logger.info(
    `The new user <${ user.email }> signed up successfully`,
    logSerializer( req, res, AuthLocaleEnum.INFO_SIGNUP, {
      user: {
        id: user.id
      }
    } ) );
};
