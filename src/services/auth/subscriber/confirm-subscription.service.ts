import { redisWrapper } from "infrastructure/database/redis/redis-client";
import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { Subscriber } from "models/auth/auth-suscriber.model";
import { subscriptionOptConfirmationRedisKeyGen } from "../helpers/subscription-opt-confirmation.helper";

export interface ISubscriptionConfirmationService {
  subscriberId: string;
  verificationToken: string;
  ipAddress: string;
  userAgent: string;
}

export async function subscriptionConfirmationService ( params: ISubscriptionConfirmationService ) {
  const { subscriberId, verificationToken, ipAddress, userAgent } = params;
  const subscriber = await Subscriber.findById( subscriberId );
  if ( !subscriber ) throw new NotFoundError();

  const key = subscriptionOptConfirmationRedisKeyGen( subscriberId );
  const token = await redisWrapper.client.get( key );
  if ( !token || token !== verificationToken ) {
    throw new BadRequestError(
      "Invalid confirmation subscription link or the link has been expired",
      AuthLocaleEnum.ERROR_CONFIRM_SUBSCRIPTION_LINK_EXP
    );
  }

  subscriber.set( {
    isEmailConfirmed: true,
    updatedByIp: ipAddress,
    userAgent
  } );

  await subscriber.save();
  await redisWrapper.client.del( key );
  return subscriber;
}