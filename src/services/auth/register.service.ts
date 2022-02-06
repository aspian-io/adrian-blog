import { BadRequestError } from "../../errors/bad-request-error";
import { AuthLocaleEnum } from "../../locales/service-locale-keys/auth.locale";
import { User } from "../../models/auth/auth-user.model";
import { authenticateService } from "./authenticate.service";

export interface IRegisterUserService {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  ipAddress: string;
  userAgent: string;
}

export async function registerService ( { firstName, lastName, email, password, ipAddress, userAgent }: IRegisterUserService ) {
  const existingUser = await User.findOne( { email } );
  if ( existingUser ) {
    throw new BadRequestError( 'Email in use', AuthLocaleEnum.ERROR_EMAIL_IN_USE );
  }

  const userToRegister = User.build( { firstName, lastName, email, password, createdByIp: ipAddress, lastIp: ipAddress, userAgent } );
  await userToRegister.save();

  const { refreshToken, jwtToken, ...user } = await authenticateService( { email, password, ipAddress, userAgent } );
  // return basic details and tokens
  return {
    user,
    jwtToken,
    refreshToken
  };
}