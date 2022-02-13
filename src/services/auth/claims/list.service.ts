import { TFunction } from "i18next";
import { Claim } from "models/auth/auth-claim.model";

export async function authClaimListService ( t: TFunction ) {
  const claims = await Claim.find();
  claims.forEach( c => c.localizedDescKey = t( c.localizedDescKey ) );
  return claims;
}