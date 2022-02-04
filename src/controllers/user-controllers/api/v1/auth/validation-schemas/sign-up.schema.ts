import { body } from 'express-validator';
import { validationMsgSerializer } from '../../../../../../errors/request-validation-error';
import { AuthLocaleEnum } from '../../../../../../locales/service-locale-keys/auth.locale';

export const signupSchema = [
  body( 'firstName' )
    .trim()
    .notEmpty()
    .withMessage( validationMsgSerializer( "You must enter your first name", AuthLocaleEnum.ERROR_SCHEMA_SIGNUP_FIRSTNAME ) ),
  body( 'lastName' )
    .trim()
    .notEmpty()
    .withMessage( validationMsgSerializer( "You must enter your last name", AuthLocaleEnum.ERROR_SCHEMA_SIGNUP_LASTNAME ) ),
  body( 'email' )
    .isEmail()
    .withMessage( validationMsgSerializer( "Email must be valid", AuthLocaleEnum.ERROR_SCHEMA_SIGNUP_EMAIL ) ),
  body( 'password' )
    .trim()
    .isLength( { min: 4, max: 20 } )
    .withMessage( validationMsgSerializer(
      "You must supply a password being between 4 and 20 characters",
      AuthLocaleEnum.ERROR_SCHEMA_SIGNUP_PASSWORD
    ) )
];
