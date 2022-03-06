import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options.infra";
import { clearCache } from "infrastructure/cache/clear-cache.infra";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { User } from "models/auth/auth-user.model";

export interface IAuthChangeAvatarParams {
  userId: string;
  avatarUrl?: string;
  updatedBy: string;
  updatedByIp: string;
  userAgent: string;
}

export async function authChangeAvatarService ( params: IAuthChangeAvatarParams ) {
  const { userId, avatarUrl, updatedBy, updatedByIp, userAgent } = params;
  const user = await User.findById( userId );
  if ( !user ) throw new NotFoundError();
  user.set( {
    avatar: avatarUrl,
    updatedBy,
    updatedByIp,
    userAgent
  } );
  await user.save();
  clearCache( CacheOptionServiceEnum.USER );
  return user;
}