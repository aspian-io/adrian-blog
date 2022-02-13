import { BadRequestError } from "errors/bad-request-error";
import { PasswordUtil } from "helpers/password-util.helper";
import { AuthLocaleEnum } from "locales/service-locale-keys/auth.locale";
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
  const user = await User.findOne( { userEmail } ).populate( 'claims' );
  const { firstName, lastName, email } = user;

  if ( !user ) {
    throw new BadRequestError( 'Invalid Crendentials', AuthLocaleEnum.ERROR_BADREQ_PASS_MISMATCH );
  }

  const passwordsMatch = await PasswordUtil.compare( user.password, userPassword );
  if ( !passwordsMatch ) {
    throw new BadRequestError( 'Invalid Credentials', AuthLocaleEnum.ERROR_BADREQ_PASS_MISMATCH );
  }

  // authentication successful so generate jwt and refresh tokens
  const jwtToken = authJwtTokenGen( user, user.claims );
  const refreshToken = authRefreshTokenGen( user, userIpAddress, userAgent );

  // save refresh token
  await refreshToken.save();

  // return basic details and tokens
  return {
    firstName,
    lastName,
    email,
    jwtToken,
    refreshToken: refreshToken.token
  };
}
