import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { docListGenerator } from "infrastructure/service-utils/doc-list-generator";
import { User } from "models/auth/auth-user.model";
import { ParsedQs } from 'qs';

export async function authUserListService ( query: ParsedQs ) {
  const result = await docListGenerator( {
    fieldsToExclude: [],
    model: User,
    queryStringParams: query
  } );

  return result;
}