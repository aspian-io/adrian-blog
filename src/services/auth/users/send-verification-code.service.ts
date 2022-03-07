import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { NotFoundError } from "infrastructure/errors/not-found-error";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { VerificationCode } from "infrastructure/sms/verification-code";
import { User } from "models/auth/auth-user.model";
import { ISmsPatternVerificationValues } from "services/sms/helpers/types";
import { PatternNameEnum, sendPatternSMS, sendSMS } from "services/sms/send-sms.service";

export async function authSendVerificationCodeService ( userId: string ) {
  const user = await User.findById( userId );
  if ( !user || !user.mobilePhone ) throw new NotFoundError();

  if ( user.isMobilePhoneVerified ) {
    throw new BadRequestError(
      "User's mobile phone number has been already verified",
      AuthLocaleEnum.ERROR_MOBILE_ALREADY_VERIFIED
    );
  }

  const verificationCode = new VerificationCode( userId );
  const code = await verificationCode.generateCode();

  await sendPatternSMS<ISmsPatternVerificationValues>(
    PatternNameEnum.SMS_VERIFICATION_CODE_PATTERN,
    user.mobilePhone,
    {
      name: user.firstName,
      verificationCode: code
    }
  );

  return user;
}