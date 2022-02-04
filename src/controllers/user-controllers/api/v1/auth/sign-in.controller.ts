import { setTokenCookie } from '../../../../../helpers/cookie.helper';
import { Request, Response } from 'express';
import { authenticateService } from '../../../../../services/auth/authenticate.service';
import { logger } from '../../../../../services/winston-logger/logger.service';
import { logSerializer } from '../../../../../helpers/log-serializer.helper';
import { AuthLocaleEnum } from '../../../../../locales/service-locale-keys/auth.locale';

export async function signinController ( req: Request, res: Response ) {
  const { email, password } = req.body;
  const ipAddress = req.ip;
  const userAgent = req.get( 'User-Agent' ) ?? "unknown_agent";

  const { refreshToken, ...user } = await authenticateService( { email, password, ipAddress, userAgent } );
  setTokenCookie( res, refreshToken );
  res.status( 200 ).send( user );
  logger.info( "user successfully signed-in", logSerializer( req, res, AuthLocaleEnum.INFO_SIGNIN ) );
};
