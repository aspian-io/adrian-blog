import { redisWrapper } from "infrastructure/database/redis/redis-client";
import { sendMail } from "infrastructure/email/mailer";
import { subscriptionCancellationTemplate } from "infrastructure/email/templates/subscription-cancellation";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { LangEnum } from "infrastructure/locales/i18next-config";
import { Subscriber } from "models/auth/auth-suscriber.model";
import { subscriptionOptConfirmationRedisKeyGen, subscriptionOptConfirmationTokenGen } from "../helpers/subscription-opt-confirmation.helper";

export async function authUnsubscribeService ( email: string ) {
  const subscriber = await Subscriber.findOne( { email } );
  if ( !subscriber ) throw new NotFoundError();

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

  const subscriptionCancellationLink = `${ process.env.BASE_URL }/${ process.env.SUBSCRIPTION_CANCELLATION_PATH }/${ subscriber.id }/${ token }`;
  const { subject, template } = subscriptionCancellationTemplate(
    LangEnum[ process.env.DEFAULT_LANG! as keyof typeof LangEnum ],
    subscriber.email,
    subscriptionCancellationLink
  );
  await sendMail( {
    from: process.env.EMAIL!,
    to: subscriber.email,
    subject,
    html: template
  } );

  return subscriber;
}