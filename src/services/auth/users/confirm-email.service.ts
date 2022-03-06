import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options.infra";
import { clearCache } from "infrastructure/cache/clear-cache.infra";
import { redisWrapper } from "infrastructure/database/redis/redis-client.infra";
import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { User } from "models/auth/auth-user.model";
import { authEmailConfirmationRedisKeyGen } from "../helpers/email-confirmation.helper";

export interface IAuthConfirmEmail {
  userId: string;
  verificationToken: string;
  ipAddress: string;
  userAgent: string;
}

export async function authConfirmEmailService ( params: IAuthConfirmEmail ) {
  const { userId, verificationToken, ipAddress, userAgent } = params;
  const user = await User.findById( userId );
  if ( !user ) {
    throw new BadRequestError(
      "Invalid confirmation email link or the link expired",
      AuthLocaleEnum.ERROR_CONFIRM_EMAIL_LINK_EXP
    );
  }

  const key = authEmailConfirmationRedisKeyGen( userId );
  const token = await redisWrapper.client.get( key );
  if ( !token || token !== verificationToken ) {
    throw new BadRequestError(
      "Invalid confirmation email link or the link expired",
      AuthLocaleEnum.ERROR_CONFIRM_EMAIL_LINK_EXP
    );
  }

  user.set( {
    isEmailConfirmed: true,
    updatedBy: userId,
    updatedByIp: ipAddress,
    userAgent
  } );

  await user.save();
  await redisWrapper.client.del( key );
  clearCache( CacheOptionServiceEnum.USER );
  return user;
}