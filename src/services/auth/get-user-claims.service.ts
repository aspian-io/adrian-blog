import { BadRequestError } from "../../errors/bad-request-error";
import { AuthLocaleEnum } from "../../locales/service-locale-keys/auth.locale";
import { ClaimDoc } from "../../models/auth-claim.model";
import { User } from "../../models/auth-user.model";

export async function getUserClaimsService ( userId: string ): Promise<string[]> {
  const claims: string[] = [];
  const user = await User.findById( userId ).populate( 'claims' );
  if ( !user ) throw new BadRequestError( "User not found", AuthLocaleEnum.ERROR_USER_NOT_FOUND );
  user?.claims?.forEach( ( c: ClaimDoc ) => {
    claims.push( c.claim );
  } );

  return claims;
}
