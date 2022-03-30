import { redisWrapper } from "infrastructure/database/redis/redis-client";
import { sendMail } from "infrastructure/email/mailer";
import { subscriptionTemplate } from "infrastructure/email/templates/subscription";
import { LangEnum } from "infrastructure/locales/i18next-config";
import { Subscriber } from "models/auth/auth-suscriber.model";
import { subscriptionOptConfirmationRedisKeyGen, subscriptionOptConfirmationTokenGen } from "../helpers/subscription-opt-confirmation.helper";

export interface IAuthSubscribeService {
  lang: LangEnum;
  email: string;
  createdByIp: string;
  userAgent: string;
}

export async function authSubscribeService ( params: IAuthSubscribeService ) {
  const subscriber = Subscriber.build( {
    lang: params.lang,
    email: params.email,
    createdByIp: params.createdByIp,
    userAgent: params.userAgent
  } );
  await subscriber.save();

  const key = subscriptionOptConfirmationRedisKeyGen( subscriber.id );
  const token = subscriptionOptConfirmationTokenGen();

  const isTokenExist = await redisWrapper.client.get( key );
  if ( isTokenExist ) {
    await redisWrapper.client.del( key );
  }

  await redisWrapper.client.set( key, token, {
    EX: 1 * 24 * 60 * 60,
    NX: true
  } );

  const verificationSubscriptionLink = `${ process.env.BASE_URL }/${ process.env.SUBSCRIPTION_PATH }/${ subscriber.id }/${ token }`;
  const { subject, template } = subscriptionTemplate(
    LangEnum[ process.env.DEFAULT_LANG! as keyof typeof LangEnum ],
    subscriber.email,
    verificationSubscriptionLink
  );
  await sendMail( {
    from: process.env.EMAIL!,
    to: subscriber.email,
    subject,
    html: template
  } );

  return subscriber;
}