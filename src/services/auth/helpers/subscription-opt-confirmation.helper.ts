import { authRandomTokenStrGen } from "./random-token-string.helper";

export function subscriptionOptConfirmationRedisKeyGen ( subscriberId: string ) {
  return `subscription-opt-confirmation-${ subscriberId }`;
}

export function subscriptionOptConfirmationTokenGen () {
  return authRandomTokenStrGen();
}