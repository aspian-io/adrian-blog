import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { clearCache } from "infrastructure/cache/clear-cache";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { User } from "models/auth/auth-user.model";

export async function authDeleteUserService ( userId: string ) {
  const user = await User.findById( userId );
  if ( !user ) throw new NotFoundError();
  await user.delete();
  clearCache( CacheOptionServiceEnum.USER );
  return user;
}