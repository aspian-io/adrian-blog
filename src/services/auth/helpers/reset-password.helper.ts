import { authRandomTokenStrGen } from "./random-token-string.helper";

export function authResetPassRedisKeyGen ( userId: string ) {
  return `reset-pass-${ userId }`;
}

export function authResetPassTokenGen () {
  return authRandomTokenStrGen();
}