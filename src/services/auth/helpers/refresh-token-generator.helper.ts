import { RefreshToken } from "models/auth/auth-refresh-token.model";
import { UserDoc } from "models/auth/auth-user.model";
import { authRandomTokenStrGen } from "./random-token-string.helper";

export function authRefreshTokenGen ( user: UserDoc, ipAddress: string, userAgent: string ) {
  // create a refresh token that expires in 7 days
  const refTokenExpInDays = parseInt( process.env.REFRESH_TOKEN_EXP_IN_DAYS! );
  return RefreshToken.build( {
    user: user.id,
    token: authRandomTokenStrGen(),
    expires: new Date( Date.now() + ( refTokenExpInDays * 24 * 60 * 60 * 1000 ) ),
    createdByIp: ipAddress,
    userAgent
  } );
}
