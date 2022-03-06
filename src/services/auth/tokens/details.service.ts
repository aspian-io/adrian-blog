import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { RefreshToken } from "models/auth/auth-refresh-token.model";

export async function authRefreshTokenDetailsService ( token: string ) {
  const refreshToken = await RefreshToken.findOne( { token } ).populate( 'user' );
  if ( !refreshToken || !refreshToken.isActive ) throw new BadRequestError( 'Invalid Token', AuthLocaleEnum.ERROR_INVALID_REFRESHTOKEN );
  return refreshToken;
}
