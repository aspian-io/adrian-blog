import { Request, Response } from 'express';
import { AuthLocaleEnum } from 'infrastructure/locales/service-locale-keys/auth.locale';
import { logSerializer } from 'infrastructure/serializers/log-serializer';
import { revokeTokenService } from 'services/auth/tokens/revoke-token.service';
import { logger } from 'services/winston-logger/logger.service';

export async function authSignoutController ( req: Request, res: Response ) {
  const token = req.cookies.refreshToken;
  const ipAddress = req.ip;
  await revokeTokenService( { token, ipAddress } );
  res.clearCookie( 'refreshToken' );
  res.status( 200 ).send( {} );
  logger.info(
    "User signed out successfully",
    logSerializer( req, res, AuthLocaleEnum.INFO_SIGNOUT, { user: { id: req.currentUser!.id } } )
  );
};
