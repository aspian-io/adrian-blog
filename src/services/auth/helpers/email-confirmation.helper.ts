import { authRandomTokenStrGen } from "./random-token-string.helper";

export function authEmailConfirmationRedisKeyGen ( userId: string ) {
  return `email-confirmation-${ userId }`;
}

export function authEmailConfirmationTokenGen () {
  return authRandomTokenStrGen();
}