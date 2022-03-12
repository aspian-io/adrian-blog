import { redisWrapper } from "infrastructure/database/redis/redis-client";
import { sendMail } from "infrastructure/email/mailer";
import { resetPasswordEmailTemplate } from "infrastructure/email/templates/reset-password";
import { EmailTemplateLangEnum } from "infrastructure/email/templates/types/email-template-langs";
import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { User } from "models/auth/auth-user.model";
import { authResetPassRedisKeyGen, authResetPassTokenGen } from "../helpers/reset-password.helper";

export async function authSendPassResetLinkService ( email: string ) {
  const user = await User.findOne( { email } );
  if ( !user ) throw new NotFoundError();
  if ( user.isSuspended ) {
    throw new BadRequestError( "User is suspended", AuthLocaleEnum.ERROR_USER_IS_SUSPENDED );
  }

  const key = authResetPassRedisKeyGen( user.id );
  const token = authResetPassTokenGen();

  const isKeyExist = await redisWrapper.client.get( key );
  if ( isKeyExist ) {
    await redisWrapper.client.del( key );
  }
  await redisWrapper.client.set( key, token, {
    EX: 60 * 60,
    NX: true
  } );

  const resetPassLink = `${ process.env.BASE_URL }/${ process.env.RESET_PASS_PATH }/${ user.id }/${ token }`;
  const { subject, template } = resetPasswordEmailTemplate(
    EmailTemplateLangEnum[ process.env.DEFAULT_LANG! as keyof typeof EmailTemplateLangEnum ],
    user.email,
    resetPassLink
  );

  await sendMail( {
    from: process.env.EMAIL!,
    to: user.email,
    subject,
    html: template
  } );

  return user;
}