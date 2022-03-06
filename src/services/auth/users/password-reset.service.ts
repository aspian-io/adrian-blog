import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options.infra";
import { clearCache } from "infrastructure/cache/clear-cache.infra";
import { redisWrapper } from "infrastructure/database/redis/redis-client.infra";
import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { User } from "models/auth/auth-user.model";
import { authResetPassRedisKeyGen } from "../helpers/reset-password.helper";

export interface IAuthPassReset {
  userId: string;
  resetToken: string;
  newPassword: string;
  ipAddress: string;
  userAgent: string;
}

export async function authPasswordResetService ( params: IAuthPassReset ) {
  const { userId, resetToken, newPassword, ipAddress, userAgent } = params;
  const user = await User.findById( userId );
  if ( !user ) throw new BadRequestError( "Invalid reset password link or the link expired", AuthLocaleEnum.ERROR_RESET_LINK_EXP );

  const key = authResetPassRedisKeyGen( userId );
  const token = await redisWrapper.client.get( key );
  if ( !token || token !== resetToken ) throw new BadRequestError( "Invalid reset password link or the link expired", AuthLocaleEnum.ERROR_RESET_LINK_EXP );

  user.set( {
    password: newPassword,
    updatedBy: userId,
    updatedByIp: ipAddress,
    userAgent
  } );

  await user.save();
  await redisWrapper.client.del( key );
  clearCache( CacheOptionServiceEnum.USER );

  return user;
}