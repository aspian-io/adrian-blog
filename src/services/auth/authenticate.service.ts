import { BadRequestError } from "../../errors/bad-request-error";
import { PasswordUtil } from "../../helpers/password-util.helper";
import { AuthLocaleEnum } from "../../locales/service-locale-keys/auth.locale";
import { User } from "../../models/auth-user.model";
import { basicDetailsService } from "./basic-details.service";
import { generateJwtTokenService } from "./generate-jwt-token.service";
import { generateRefreshTokenService } from "./generate-refresh-token.service";
import { getUserClaimsService } from "./get-user-claims.service";

export interface IAuthenticateService {
  email: string;
  password: string;
  ipAddress: string;
  userAgent: string;
}

export async function authenticateService ( { email, password, ipAddress, userAgent }: IAuthenticateService ) {
  const user = await User.findOne( { email } ).populate( 'claims' );
  const claims = await getUserClaimsService( user?.id );

  if ( !user ) {
    throw new BadRequestError( 'Invalid Crendentials', AuthLocaleEnum.ERROR_BADREQ_PASS_MISMATCH );
  }

  const passwordsMatch = await PasswordUtil.compare( user.password, password );
  if ( !passwordsMatch ) {
    throw new BadRequestError( 'Invalid Credentials', AuthLocaleEnum.ERROR_BADREQ_PASS_MISMATCH );
  }

  // authentication successful so generate jwt and refresh tokens
  const jwtToken = generateJwtTokenService( user, claims );
  const refreshToken = generateRefreshTokenService( user, ipAddress, userAgent );

  // save refresh token
  await refreshToken.save();

  // return basic details and tokens
  return {
    ...basicDetailsService( user ),
    jwtToken,
    refreshToken: refreshToken.token
  };
}
