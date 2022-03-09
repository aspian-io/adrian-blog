import { TFunction } from "i18next";
import { docListGenerator } from "infrastructure/service-utils/doc-list-generator";
import { Claim } from "models/auth/auth-claim.model";
import { ParsedQs } from 'qs';

export async function authClaimListService ( t: TFunction, query: ParsedQs ) {
  const result = await docListGenerator( {
    fieldsToExclude: [ "localizedMsgKey" ],
    model: Claim,
    queryStringParams: query,
  } );
  result.data.forEach( c => c.localizedDescKey = t( c.localizedDescKey ) );
  return result;
}