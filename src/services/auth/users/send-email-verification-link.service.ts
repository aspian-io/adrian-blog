import { sendMail } from "infrastructure/email/mailer";
import { emailVerificationTemplate } from "infrastructure/email/templates/email-verification";
import { User } from "models/auth/auth-user.model";
import { authEmailConfirmationRedisKeyGen, authEmailConfirmationTokenGen } from "../helpers/email-confirmation.helper";
import { redisWrapper } from "infrastructure/database/redis/redis-client";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { LangEnum } from "infrastructure/locales/i18next-config";

export async function authSendEmailVerificationLinkService ( userId: string ) {
  const user = await User.findById( userId );
  if ( !user ) throw new NotFoundError();
  if ( user.isEmailConfirmed ) {
    throw new BadRequestError(
      "User has already confirmed you email address",
      AuthLocaleEnum.ERROR_EMAIL_ALREADY_CONFIRMED
    );
  }

  const key = authEmailConfirmationRedisKeyGen( userId );
  const token = authEmailConfirmationTokenGen();

  const isTokenExist = await redisWrapper.client.get( key );
  if ( isTokenExist ) {
    await redisWrapper.client.del( key );
  }

  await redisWrapper.client.set( key, token, {
    EX: 1 * 24 * 60 * 60,
    NX: true
  } );

  const verificationEmailLink = `${ process.env.BASE_URL }/${ process.env.EMAIL_VERIFICATION_PATH }/${ user.id }/${ token }`;
  const { subject, template } = emailVerificationTemplate(
    LangEnum[ process.env.DEFAULT_LANG! as keyof typeof LangEnum ],
    user.email,
    verificationEmailLink
  );
  await sendMail( {
    from: process.env.EMAIL!,
    to: user.email,
    subject,
    html: template
  } );

  return user;
}