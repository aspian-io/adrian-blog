import { basicDetailsService } from "./basic-details.service";
import { generateJwtTokenService } from "./generate-jwt-token.service";
import { generateRefreshTokenService } from "./generate-refresh-token.service";
import { getRefreshTokenService } from "./get-refresh-token.service";

export interface IRefreshTokenService {
  token: string;
  ipAddress: string;
  userAgent: string;
}

export async function refreshTokenService ( { token, ipAddress, userAgent }: IRefreshTokenService ) {
  const refreshToken = await getRefreshTokenService( token );
  const { user } = refreshToken;

  // replace old refresh token with a new one and save
  const newRefreshToken = generateRefreshTokenService( user, ipAddress, userAgent );
  refreshToken.revoked = Date.now();
  refreshToken.revokedByIp = ipAddress;
  refreshToken.replacedByToken = newRefreshToken.token;
  await refreshToken.save();
  await newRefreshToken.save();

  // generate new jwt
  const jwtToken = generateJwtTokenService( user, user.claims );

  // return basic details and tokens
  return {
    ...basicDetailsService( user ),
    jwtToken,
    refreshToken: newRefreshToken.token
  };
}
