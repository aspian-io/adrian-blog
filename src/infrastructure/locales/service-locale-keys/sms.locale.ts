export enum SMSLocaleEnum {
  INFO_SEND_MANUALLY = "info.sms.sendManually.successMsg",
  INFO_SEND_BY_PATTERN = "info.sms.sendByPattern.successMsg",

  ERROR_PROVIDER = "errors.sms.createPattern.providerErr",
  ERROR_PROVIDER_CREDIT = "errors.sms.bulkSmsToUsers.providerCreditErr",
  ERROR_PATTERN_NOT_FOUND = "errors.sms.bulkSmsToUsers.patternNotFound",
  ERROR_PATTERN_CODE_NOT_FOUND = "errors.sms.bulkSmsToUsers.patternCodeNotFound",
  ERROR_USERS_NOT_FOUND = "errors.sms.bulkSmsToUsers.usersNotFound",

  ERROR_SCHEMA_CHOOSE_USERS = "errors.sms.sendByPatternSchema.chooseUsers",
  ERROR_SCHEMA_CHOOSE_PATTERN = "errors.sms.sendByPatternSchema.choosePattern",
  ERROR_SCHEMA_RECIPIENTS = "errors.sms.sendManuallySchema.recipients",
  ERROR_SCHEMA_MESSAGE = "errors.sms.sendManuallySchema.message",
}