import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { clearCache } from "infrastructure/cache/clear-cache";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { User } from "models/auth/auth-user.model";

export async function authIsUserSuspendedService ( userId: string ): Promise<boolean> {
  const user = await User.findById( userId );
  if ( !user ) throw new NotFoundError();
  clearCache( CacheOptionServiceEnum.USER );
  return user.isSuspended;
}