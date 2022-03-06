import { CacheOptionServiceEnum } from "infrastructure/cache/cache-options.infra";
import { clearCache } from "infrastructure/cache/clear-cache.infra";
import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { VerificationCode } from "infrastructure/sms/verification-code.infra";
import { User } from "models/auth/auth-user.model";

export async function authConfirmVerificationCodeService ( userId: string, verificationCode: string ) {
  const user = await User.findById( userId );
  if ( !user || !user.mobilePhone ) throw new NotFoundError();

  const verificationCodeUtil = new VerificationCode( userId );
  const isCodeValid = await verificationCodeUtil.isCodeValid( verificationCode );
  if ( !isCodeValid ) {
    throw new BadRequestError(
      "The verification code has been expired or is undefined",
      AuthLocaleEnum.ERROR_VERIFICATION_CODE_EXPIRED
    );
  }
  user.isMobilePhoneVerified = true;
  await user.save();
  await verificationCodeUtil.removeCode();
  clearCache( CacheOptionServiceEnum.USER );
  return user;
}