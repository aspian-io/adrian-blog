import { body } from "express-validator";
import { validationMsgSerializer } from "infrastructure/errors/request-validation-error";
import { EmailLocaleEnum } from "infrastructure/locales/service-locale-keys/email.locale";

export const emailSendByTemplateSchema = [
  body( 'userIds' )
    .isArray( { min: 1 } )
    .withMessage(
      validationMsgSerializer(
        "Choose some users to send email to",
        EmailLocaleEnum.ERROR_SCHEMA_CHOOSE_USERS
      )
    ),
  body( 'emailTemplateId' )
    .trim()
    .notEmpty()
    .withMessage(
      validationMsgSerializer(
        "Choose a template to be used for sending email",
        EmailLocaleEnum.ERROR_SCHEMA_CHOOSE_TEMPLATE
      )
    ),
  body( 'subject' )
    .trim()
    .notEmpty()
    .withMessage(
      validationMsgSerializer(
        "Please enter email's subject",
        EmailLocaleEnum.ERROR_SCHEMA_ENTER_SUBJECT
      )
    )
];