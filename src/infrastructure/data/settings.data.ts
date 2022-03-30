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
    key: SettingsKeyEnum.SMS_BIRTHDAY_CONGRATS,
    value: "false",
    service: SettingsServiceEnum.SMS,
    userAgent: "SYSTEM"
  },
  {
    key: SettingsKeyEnum.SMS_BIRTHDAY_CONGRATS_TIME,
    value: "12",
    service: SettingsServiceEnum.SMS,
    userAgent: "SYSTEM"
  },

  {
    key: SettingsKeyEnum.EMAIL_NEWSLETTER_SEND,
    value: "false",
    service: SettingsServiceEnum.EMAIL,
    userAgent: "SYSTEM"
  },
  {
    key: SettingsKeyEnum.EMAIL_NEWSLETTER_SEND_TIME,
    value: "18",
    service: SettingsServiceEnum.EMAIL,
    userAgent: "SYSTEM"
  },
  {
    key: SettingsKeyEnum.EMAIL_NEWSLETTER_HEADER,
    value: "false",
    service: SettingsServiceEnum.EMAIL,
    userAgent: "SYSTEM"
  },
  {
    key: SettingsKeyEnum.EMAIL_NEWSLETTER_BODY,
    value: "false",
    service: SettingsServiceEnum.EMAIL,
    userAgent: "SYSTEM"
  },
  {
    key: SettingsKeyEnum.EMAIL_NEWSLETTER_FOOTER,
    value: "false",
    service: SettingsServiceEnum.EMAIL,
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
  {
    key: SettingsKeyEnum.ATTACHMENT_URL_EXP_HOURS,
    value: "24",
    service: SettingsServiceEnum.ATTACHMENTS,
    userAgent: "SYSTEM"
  },
];