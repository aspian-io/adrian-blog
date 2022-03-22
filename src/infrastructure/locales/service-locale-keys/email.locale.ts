export enum EmailLocaleEnum {
  INFO_SEND_BY_TEMPLATE = "info.email.sendByTemplate.successMsg",
  INFO_SEND_ONE = "info.email.sendOne.successMsg",

  ERROR_TEMPLATE_NOT_FOUND = "errors.email.bulkEmailToUsers.templateNotFound",
  ERROR_USERS_NOT_FOUND = "errors.email.bulkEmailToUsers.usersNotFound",

  ERROR_SCHEMA_CHOOSE_USERS = "errors.email.sendByTemplateSchema.chooseUsers",
  ERROR_SCHEMA_CHOOSE_TEMPLATE = "errors.email.sendByTemplateSchema.chooseTemplate",
  ERROR_SCHEMA_ENTER_SUBJECT = "errors.email.sendByTemplateSchema.subject",
  ERROR_SCHEMA_DEST_ADDRESS = "errors.email.sendEmailSchema.to",
  ERROR_SCHEMA_CONTENT = "errors.email.sendEmailSchema.content"
}