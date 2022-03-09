import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { authJwtTokenGen } from "../helpers/jwt-token-generator.helper";
import { authRefreshTokenGen } from "../helpers/refresh-token-generator.helper";
import { authRefreshTokenDetailsService } from "../tokens/details.service";

export interface IRefreshTokenService {
  token: string;
  ipAddress: string;
  userAgent: string;
}

export async function authRefreshTokensService ( { token, ipAddress, userAgent }: IRefreshTokenService ) {
  const refreshToken = await authRefreshTokenDetailsService( token );
  const { user } = refreshToken;
  const { firstName, lastName, email, isSuspended } = user;

  if ( isSuspended ) {
    throw new BadRequestError( "User is suspended", AuthLocaleEnum.ERROR_USER_IS_SUSPENDED );
  }

  // replace old refresh token with a new one and save
  const newRefreshToken = authRefreshTokenGen( user, ipAddress, userAgent );
  refreshToken.revoked = new Date();
  refreshToken.revokedByIp = ipAddress;
  refreshToken.replacedByToken = newRefreshToken.token;
  await refreshToken.save();
  await newRefreshToken.save();

  // generate new jwt
  const jwtToken = authJwtTokenGen( user, user.claims );

  // return basic details and tokens
  return {
    firstName,
    lastName,
    email,
    jwtToken,
    refreshToken: newRefreshToken.token
  };
}
