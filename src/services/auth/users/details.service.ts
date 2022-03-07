import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { User } from "models/auth/auth-user.model";

export async function authUserDetailsService ( id: string ) {
  const user = await User.findById( id ).cache( CacheOptionServiceEnum.USER );
  if ( !user ) throw new NotFoundError();
  return user;
}