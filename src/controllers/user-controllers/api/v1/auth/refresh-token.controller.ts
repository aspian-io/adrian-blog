import { Request, Response } from 'express';
import { authRefreshTokensService } from 'services/auth/users/refresh-tokens.service';
import { setTokenCookie } from 'infrastructure/security/cookie';
import { NotAuthenticatedError } from 'infrastructure/errors/not-authenticated-error';

export async function authRefreshTokenController ( req: Request, res: Response ) {
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
