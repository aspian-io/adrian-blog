import { body } from "express-validator";
import { validationMsgSerializer } from "infrastructure/errors/request-validation-error";
import { CommentLocaleEnum } from "infrastructure/locales/service-locale-keys/post-comment.locale";

export const postCommentCreateSchema = [
  body( 'title' )
    .not()
    .isEmpty()
    .withMessage(
      validationMsgSerializer(
        "Comment title is required",
        CommentLocaleEnum.ERROR_SCHEMA_CREATE_TITLE_EMPTY
      )
    )
    .isLength( { max: 60 } )
    .withMessage(
      validationMsgSerializer(
        "Comment title's length must be less than 60 characters",
        CommentLocaleEnum.ERROR_SCHEMA_CREATE_TITLE_LENGTH
      )
    ),
  body( 'content' )
    .not()
    .isEmpty()
    .withMessage(
      validationMsgSerializer(
        "Comment content cannot be empty",
        CommentLocaleEnum.ERROR_SCHEMA_CREATE_CONTENT_EMPTY
      )
    )
    .isLength( { max: 250 } )
    .withMessage(
      validationMsgSerializer(
        "Comment content's length must be less than 250 characters",
        CommentLocaleEnum.ERROR_SCHEMA_CREATE_CONTENT_LENGTH
      )
    )
];