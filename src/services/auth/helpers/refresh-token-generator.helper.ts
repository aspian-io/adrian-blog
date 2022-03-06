import { RefreshToken } from "models/auth/auth-refresh-token.model";
import { UserDoc } from "models/auth/auth-user.model";
import { authRandomTokenStrGen } from "./random-token-string.helper";

const refTokenExpInDays = parseInt( process.env.REFRESH_TOKEN_EXP_IN_DAYS! );

export function authRefreshTokenGen (
  user: UserDoc,
  ipAddress: string,
  userAgent: string,
  expires: Date = new Date( Date.now() + ( refTokenExpInDays * 24 * 60 * 60 * 1000 ) )
) {
  return RefreshToken.build( {
    user: user.id,
    token: authRandomTokenStrGen(),
    expires,
    createdByIp: ipAddress,
    userAgent
  } );
}
