import { body } from 'express-validator';
import { validationMsgSerializer } from 'infrastructure/errors/request-validation-error';
import { SMSLocaleEnum } from 'infrastructure/locales/service-locale-keys/sms.locale';

export const smsSendByPatternSchema = [
  body( 'userIds' )
    .isArray( { min: 1 } )
    .withMessage(
      validationMsgSerializer(
        "Choose some users to send sms to",
        SMSLocaleEnum.ERROR_SCHEMA_CHOOSE_USERS
      )
    ),
  body( 'smsTemplateId' )
    .trim()
    .notEmpty()
    .withMessage(
      validationMsgSerializer(
        "Choose a pattern to be used for sending sms",
        SMSLocaleEnum.ERROR_SCHEMA_CHOOSE_PATTERN
      )
    )
];