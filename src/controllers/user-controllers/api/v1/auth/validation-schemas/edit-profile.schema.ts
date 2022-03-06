import { body } from "express-validator";
import { validationMsgSerializer } from "infrastructure/errors/request-validation-error";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";

export const editProfileSchema = [
  body( 'firstName' )
    .trim()
    .notEmpty()
    .withMessage(
      validationMsgSerializer(
        "You must supply your first name",
        AuthLocaleEnum.ERROR_SCHEMA_EDIT_PROFILE_FIRSTNAME
      )
    ),
  body( 'lastName' )
    .trim()
    .notEmpty()
    .withMessage(
      validationMsgSerializer(
        "You must supply your last name",
        AuthLocaleEnum.ERROR_SCHEMA_EDIT_PROFILE_LASTNAME
      )
    )
];