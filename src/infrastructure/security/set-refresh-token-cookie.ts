import { Response } from 'express';

const refTokenExpInDays = parseInt( process.env.REFRESH_TOKEN_EXP_IN_DAYS! );

export const setRefreshTokenCookie = ( res: Response, token: string ) => {
  // create http only cookie with refresh token that expires in 7 days
  const cookieOptions = {
    httpOnly: true,
    expires: new Date( Date.now() + refTokenExpInDays * 24 * 60 * 60 * 1000 ),
    secure: process.env.NODE_ENV !== 'development'
  };
  res.cookie( 'refreshToken', token, cookieOptions );
};
