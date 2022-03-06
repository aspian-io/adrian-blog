import { PasswordUtil } from "infrastructure/security/password-util.infra";
import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options.infra";
import { clearCache } from "infrastructure/cache/clear-cache.infra";
import { User } from "models/auth/auth-user.model";
import { changePasswordTemplate } from "infrastructure/email/templates/change-password.infra";
import { EmailTemplateLangEnum } from "infrastructure/email/templates/types/email-template-langs.infra";
import { sendMail } from "infrastructure/email/mailer.infa";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";

export interface IAuthChangePassword {
  userId: string;
  currentPassword: string;
  newPassword: string;
  updatedBy: string;
  updatedByIp: string;
  userAgent: string;
}

export async function authChangePasswordService ( params: IAuthChangePassword ) {
  const { userId, currentPassword, newPassword, updatedBy, updatedByIp, userAgent } = params;
  const user = await User.findById( userId );
  if ( !user ) throw new NotFoundError();

  if ( user.isSuspended ) {
    throw new BadRequestError( "User is suspended", AuthLocaleEnum.ERROR_USER_IS_SUSPENDED );
  }

  const passwordsMatch = await PasswordUtil.compare( user.password, currentPassword );
  if ( !passwordsMatch ) {
    throw new BadRequestError( 'Invalid Credentials', AuthLocaleEnum.ERROR_BADREQ_PASS_MISMATCH );
  }

  user.set( {
    password: newPassword,
    updatedBy,
    updatedByIp,
    userAgent
  } );

  await user.save();
  clearCache( CacheOptionServiceEnum.USER );

  const { subject, template } = changePasswordTemplate(
    EmailTemplateLangEnum[ process.env.DEFAULT_LANG! as keyof typeof EmailTemplateLangEnum ],
    user.email
  );

  await sendMail( {
    from: process.env.EMAIL!,
    to: user.email,
    subject,
    html: template
  } );

  return user;
}