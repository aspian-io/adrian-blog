import { Request, Response } from 'express';
import { setTokenCookie } from 'helpers/cookie.helper';
import { NotAuthenticatedError } from 'errors/not-authenticated-error';
import { authRefreshTokensService } from 'services/auth/users/refresh-tokens.service';

export async function refreshTokenController ( req: Request, res: Response ) {
  const token = req.cookies.refreshToken;
  const ipAddress = req.ip;
  const userAgent = req.get( 'User-Agent' ) ?? "unknown_agent";
  if ( token ) {
    const { refreshToken, ...user } = await authRefreshTokensService( { token, ipAddress, userAgent } );
    setTokenCookie( res, refreshToken );
    res.status( 200 ).send( user );
  }
  throw new NotAuthenticatedError();
};
