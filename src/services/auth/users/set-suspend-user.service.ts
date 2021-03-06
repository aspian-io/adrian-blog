import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options";
import { clearCache } from "infrastructure/cache/clear-cache";
import { sendMail } from "infrastructure/email/mailer";
import { suspendAccountTemplate } from "infrastructure/email/templates/suspend-account";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { LangEnum } from "infrastructure/locales/i18next-config";
import { User } from "models/auth/auth-user.model";

export interface ISetSuspendedUser {
  userId: string;
  isSuspended: boolean;
  updatedBy: string;
  updatedByIp: string;
  userAgent: string;
}

export async function authSetSuspendUserService ( params: ISetSuspendedUser ) {
  const { userId, isSuspended, updatedBy, updatedByIp, userAgent } = params;
  const user = await User.findById( userId );
  if ( !user ) throw new NotFoundError();

  user.set( { isSuspended, updatedBy, updatedByIp, userAgent } );
  await user.save();
  clearCache( CacheOptionServiceEnum.USER );

  const { subject, template } = suspendAccountTemplate(
    LangEnum[ process.env.DEFAULT_LANG! as keyof typeof LangEnum ],
    user.email,
    user.isSuspended
  );
  await sendMail( {
    from: process.env.EMAIL!,
    to: user.email,
    subject,
    html: template
  } );

  return user;
}