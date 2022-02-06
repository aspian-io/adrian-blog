import { RefreshToken } from "../../models/auth/auth-refresh-token.model";
import { BadRequestError } from '../../errors/bad-request-error';
import { AuthLocaleEnum } from "../../locales/service-locale-keys/auth.locale";

export async function getRefreshTokenService ( token: string ) {
  const refreshToken = await RefreshToken.findOne( { token } ).populate( 'user' );
  if ( !refreshToken || !refreshToken.isActive ) throw new BadRequestError( 'Invalid Token', AuthLocaleEnum.ERROR_INVALID_REFRESHTOKEN );
  return refreshToken;
}
