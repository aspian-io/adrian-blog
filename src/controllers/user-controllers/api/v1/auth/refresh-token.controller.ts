import { Request, Response } from 'express';
import { authRefreshTokensService } from 'services/auth/users/refresh-tokens.service';
import { NotAuthenticatedError } from 'infrastructure/errors/not-authenticated-error';
import { setRefreshTokenCookie } from 'infrastructure/security/set-refresh-token-cookie';

export async function authRefreshTokenController ( req: Request, res: Response ) {
  const token = req.cookies.refreshToken;
  const ipAddress = req.ip;
  const userAgent = req.get( 'User-Agent' ) ?? "unknown_agent";
  if ( token ) {
    const { refreshToken, ...user } = await authRefreshTokensService( { token, ipAddress, userAgent } );
    setRefreshTokenCookie( res, refreshToken );
    res.status( 200 ).send( user );
  }
  throw new NotAuthenticatedError();
};
