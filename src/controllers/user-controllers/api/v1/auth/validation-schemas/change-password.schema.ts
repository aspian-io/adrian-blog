import { body } from "express-validator";
import { validationMsgSerializer } from "infrastructure/errors/request-validation-error";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";

export const changePasswordSchema = [
  body( 'currentPassword' )
    .trim()
    .notEmpty()
    .withMessage( validationMsgSerializer( "You must supply current password", AuthLocaleEnum.ERROR_SCHEMA_CHANGE_PASS_CURRENT_PASS ) ),
  body( 'newPassword' )
    .trim()
    .not()
    .equals( "Pa$$w0rd" )
    .withMessage( validationMsgSerializer( "Weak password is not allowed", AuthLocaleEnum.ERROR_SCHEMA_WEAK_PASSWORD ) )
    .not()
    .equals( "Passw0rd" )
    .withMessage( validationMsgSerializer( "Weak password is not allowed", AuthLocaleEnum.ERROR_SCHEMA_WEAK_PASSWORD ) )
    .isStrongPassword( {
      minSymbols: 0
    } )
    .withMessage(
      validationMsgSerializer(
        "Your password must have at least 8 letters including uppercase letters, lowercase letters and numbers",
        AuthLocaleEnum.ERROR_SCHEMA_STRONG_PASSWORD
      )
    )
    .isLength( { max: 30 } )
    .withMessage(
      validationMsgSerializer(
        "Supplied password must be less than 30 characters",
        AuthLocaleEnum.ERROR_SCHEMA_SIGNUP_PASSWORD_MAX_LENGTH
      )
    )
];