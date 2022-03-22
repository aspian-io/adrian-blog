import { body } from "express-validator";
import { validationMsgSerializer } from "infrastructure/errors/request-validation-error";
import { EmailLocaleEnum } from "infrastructure/locales/service-locale-keys/email.locale";

export const sendEmailSchema = [
  body( 'subject' )
    .trim()
    .notEmpty()
    .withMessage(
      validationMsgSerializer(
        "Please enter email's subject",
        EmailLocaleEnum.ERROR_SCHEMA_ENTER_SUBJECT
      )
    ),
  body( 'content' )
    .trim()
    .notEmpty()
    .withMessage(
      validationMsgSerializer(
        "Please enter email's content",
        EmailLocaleEnum.ERROR_SCHEMA_CONTENT
      )
    ),
  body( 'to' )
    .isEmail()
    .withMessage(
      validationMsgSerializer(
        "Please enter destination email address",
        EmailLocaleEnum.ERROR_SCHEMA_DEST_ADDRESS
      )
    )
];