import { body } from "express-validator";
import { validationMsgSerializer } from "infrastructure/errors/request-validation-error";
import { CommentLocaleEnum } from "infrastructure/locales/service-locale-keys/post-comment.locale";

export const postCommentSettingsEditSchema = [
  body( 'value' )
    .not()
    .isEmpty()
    .withMessage(
      validationMsgSerializer(
        "Comment settings value is required",
        CommentLocaleEnum.ERROR_SCHEMA_SETTINGS_VALUE_REQUIRED
      )
    )
];