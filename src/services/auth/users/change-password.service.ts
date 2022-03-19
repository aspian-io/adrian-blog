import { PasswordUtil } from "infrastructure/security/password-util";
import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { clearCache } from "infrastructure/cache/clear-cache";
import { User } from "models/auth/auth-user.model";
import { changePasswordTemplate } from "infrastructure/email/templates/change-password";
import { sendMail } from "infrastructure/email/mailer";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { LangEnum } from "infrastructure/locales/i18next-config";

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
    LangEnum[ process.env.DEFAULT_LANG! as keyof typeof LangEnum ],
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