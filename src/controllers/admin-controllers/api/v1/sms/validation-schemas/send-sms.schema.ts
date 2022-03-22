import { body } from 'express-validator';
import { validationMsgSerializer } from 'infrastructure/errors/request-validation-error';
import { SMSLocaleEnum } from 'infrastructure/locales/service-locale-keys/sms.locale';

export const sendSmsSchema = [
  body( 'recipients' )
    .isArray( { min: 1 } )
    .withMessage(
      validationMsgSerializer(
        "Entering recipients is required",
        SMSLocaleEnum.ERROR_SCHEMA_RECIPIENTS
      )
    ),
  body( 'message' )
    .trim()
    .notEmpty()
    .withMessage(
      validationMsgSerializer(
        "Message content is required",
        SMSLocaleEnum.ERROR_SCHEMA_MESSAGE
      )
    )
];