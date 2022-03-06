import { SettingsKeyEnum, SettingsServiceEnum } from "models/settings/settings.model";

export const settingsData = [
  {
    key: SettingsKeyEnum.SMS_PROVIDER,
    value: process.env.SMS_PROVIDER,
    service: SettingsServiceEnum.SMS,
    userAgent: "SYSTEM"
  },
  {
    key: SettingsKeyEnum.SMS_ORIGINATOR,
    value: process.env.SMS_ORIGINATOR,
    service: SettingsServiceEnum.SMS,
    userAgent: "SYSTEM"
  },
  {
    key: SettingsKeyEnum.SMS_API_KEY,
    value: process.env.SMS_API_KEY,
    service: SettingsServiceEnum.SMS,
    userAgent: "SYSTEM"
  },

  {
    key: SettingsKeyEnum.COMMENT_IS_APPROVED,
    value: "true",
    service: SettingsServiceEnum.POST_COMMENTS,
    userAgent: "SYSTEM"
  },
  {
    key: SettingsKeyEnum.COMMENT_FORBIDDEN_EXPRESSIONS,
    value: "forbidden_1,forbidden_2,forbidden_3,forbidden_4",
    service: SettingsServiceEnum.POST_COMMENTS,
    userAgent: "SYSTEM"
  },
  {
    key: SettingsKeyEnum.COMMENT_FORBIDDEN_SUSPEND,
    value: "true",
    service: SettingsServiceEnum.POST_COMMENTS,
    userAgent: "SYSTEM"
  },
];