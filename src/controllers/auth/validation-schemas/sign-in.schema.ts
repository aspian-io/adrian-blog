import { body } from 'express-validator';
import { validationMsgSerializer } from '../../../errors/request-validation-error';
import { AuthLocaleEnum } from '../../../locales/service-locale-keys/auth.locale';

export const signinSchema = [
  body( 'email' )
    .isEmail()
    .withMessage( validationMsgSerializer( "Email must be valid", AuthLocaleEnum.ERROR_SCHEMA_SIGNIN_EMAIL ) ),
  body( 'password' )
    .trim()
    .notEmpty()
    .withMessage( validationMsgSerializer( "You must supply a password", AuthLocaleEnum.ERROR_SCHEMA_SIGNIN_PASSWORD ) )
];
