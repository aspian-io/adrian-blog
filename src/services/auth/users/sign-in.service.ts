import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { PasswordUtil } from "infrastructure/security/password-util";
import { User } from "models/auth/auth-user.model";
import { authJwtTokenGen } from "../helpers/jwt-token-generator.helper";
import { authRefreshTokenGen } from "../helpers/refresh-token-generator.helper";

export interface IAuthenticateService {
  userEmail: string;
  userPassword: string;
  userIpAddress: string;
  userAgent: string;
}

export async function authSignInService ( { userEmail, userPassword, userIpAddress, userAgent }: IAuthenticateService ) {
  const user = await User.findOne( { email: userEmail } ).populate( 'claims' );
  if ( !user ) {
    throw new BadRequestError( 'Invalid Crendentials', AuthLocaleEnum.ERROR_BADREQ_PASS_MISMATCH );
  }
  const { firstName, lastName, email, isSuspended, id } = user;

  if ( isSuspended ) {
    throw new BadRequestError( "User is suspended", AuthLocaleEnum.ERROR_USER_IS_SUSPENDED );
  }

  const passwordsMatch = await PasswordUtil.compare( user.password, userPassword );
  if ( !passwordsMatch ) {
    throw new BadRequestError( 'Invalid Credentials', AuthLocaleEnum.ERROR_BADREQ_PASS_MISMATCH );
  }

  // authentication successful so generate jwt and refresh tokens
  const jwtToken = authJwtTokenGen( user );
  const refreshToken = authRefreshTokenGen( user, userIpAddress, userAgent );

  // save refresh token
  await refreshToken.save();
  // return basic details and tokens
  return {
    id,
    firstName,
    lastName,
    email,
    jwtToken,
    refreshToken: refreshToken.token
  };
}
