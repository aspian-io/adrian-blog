import { redisWrapper } from "infrastructure/database/redis/redis-client";
import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { Subscriber } from "models/auth/auth-suscriber.model";
import { subscriptionOptConfirmationRedisKeyGen } from "../helpers/subscription-opt-confirmation.helper";

export interface ISubscriptionCancellationService {
  subscriberId: string;
  verificationToken: string;
}

export async function subscriptionCancellationService ( params: ISubscriptionCancellationService ) {
  const { subscriberId, verificationToken } = params;
  const subscriber = await Subscriber.findById( subscriberId );
  if ( !subscriber ) throw new NotFoundError();

  const key = subscriptionOptConfirmationRedisKeyGen( subscriberId );
  const token = await redisWrapper.client.get( key );
  if ( !token || token !== verificationToken ) {
    throw new BadRequestError(
      "Invalid subscription cancellation link or the link has been expired",
      AuthLocaleEnum.ERROR_SUBSCRIPTION_CANCELLATION_LINK_EXP
    );
  }

  await subscriber.delete();

  await redisWrapper.client.del( key );
  return subscriber;
}