import { SettingsKeyEnum } from "models/settings/settings.model";

export interface IFarazSMSPattern {
  settingKey: SettingsKeyEnum;
  pattern: string;
  description: string;
  is_shared: boolean;
}

export const farazSMSDefaultPatterns: IFarazSMSPattern[] = [
  {
    settingKey: SettingsKeyEnum.SMS_VERIFICATION_CODE_PATTERN,
    pattern: `%name% عزیز، کد اعتبارسنجی شما برابر %verificationCode% است.

    ${ process.env.BRAND_NAME }
    ${ process.env.FULL_ADDRESS }`,
    description: "پیامک ارسال کد اعتبارسنجی",
    is_shared: false
  }
];