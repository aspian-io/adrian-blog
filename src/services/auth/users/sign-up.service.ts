import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { clearCache } from "infrastructure/cache/clear-cache";
import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { User } from "models/auth/auth-user.model";
import { authSignInService } from "./sign-in.service";

export interface IRegisterUserService {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  ipAddress: string;
  userAgent: string;
}

export async function authSignUpService ( { firstName, lastName, email, password, ipAddress, userAgent }: IRegisterUserService ) {
  const existingUser = await User.findOne( { email } );
  if ( existingUser ) {
    throw new BadRequestError( 'Email in use', AuthLocaleEnum.ERROR_EMAIL_IN_USE );
  }

  const userToRegister = User.build( { firstName, lastName, email, password, createdByIp: ipAddress, lastIp: ipAddress, userAgent } );
  await userToRegister.save();
  clearCache( CacheOptionServiceEnum.USER );

  // return basic details and tokens
  return {
    id: userToRegister.id,
    firstName: userToRegister.firstName,
    lastName: userToRegister.lastName,
    email: userToRegister.email
  };
}