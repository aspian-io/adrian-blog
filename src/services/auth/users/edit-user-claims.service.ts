import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { CoreLocaleEnum } from "infrastructure/locales/service-locale-keys/core.locale";
import { AccessPoliciesEnum } from "infrastructure/security/access-policies.enum";
import { User } from "models/auth/auth-user.model";

export async function authEditUserClaimsService ( userId: string, claims: AccessPoliciesEnum[] ) {
  const user = await User.findById( userId );
  if ( !user ) throw new NotFoundError();
  const claimAllowedKeys = Object.keys( AccessPoliciesEnum );
  if ( claims.length > 0 ) {
    claims.forEach( c => {
      if ( !claimAllowedKeys.includes( c ) ) {
        throw new BadRequestError( "Something went wrong editing user's claims", CoreLocaleEnum.ERROR_400_MSG );
      }
    } );
  }
  user.set( { claims } );
  await user.save();

  return user;
}