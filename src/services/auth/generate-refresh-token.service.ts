import { RefreshToken } from "../../models/auth-refresh-token.model";
import { UserDoc } from "../../models/auth-user.model";
import { randomTokenStringService } from "./random-token-string.service";

export function generateRefreshTokenService ( user: UserDoc, ipAddress: string, userAgent: string ) {
  // create a refresh token that expires in 7 days
  const refTokenExpInDays = parseInt( process.env.REFRESH_TOKEN_EXP_IN_DAYS! );
  return RefreshToken.build( {
    user: user.id,
    token: randomTokenStringService(),
    expires: new Date( Date.now() + ( refTokenExpInDays * 24 * 60 * 60 * 1000 ) ),
    createdByIp: ipAddress,
    userAgent
  } );
}
