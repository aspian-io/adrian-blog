import { body } from "express-validator";
import { validationMsgSerializer } from "infrastructure/errors/request-validation-error";
import { SettingLocaleEnum } from "infrastructure/locales/service-locale-keys/settings.locale";

export const settingEditSchema = [
  body( 'value' )
    .not()
    .isEmpty()
    .withMessage(
      validationMsgSerializer(
        "Setting value is required",
        SettingLocaleEnum.ERROR_SCHEMA_VALUE_REQUIRED
      )
    )
];