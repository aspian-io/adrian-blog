import { body } from 'express-validator';
import { validationMsgSerializer } from 'infrastructure/errors/request-validation-error';
import { PostLocaleEnum } from 'infrastructure/locales/service-locale-keys/posts.locale';

export const postEditSchema = [
  body( 'title' )
    .not()
    .isEmpty()
    .withMessage(
      validationMsgSerializer(
        'Post title is required',
        PostLocaleEnum.ERROR_SCHEMA_EDIT_TITLE
      )
    ),
  body( 'excerpt' )
    .not()
    .isEmpty()
    .withMessage(
      validationMsgSerializer(
        'Post excerpt is required',
        PostLocaleEnum.ERROR_SCHEMA_EDIT_EXCERPT
      )
    ),
  body( 'content' )
    .not()
    .isEmpty()
    .withMessage(
      validationMsgSerializer(
        'Post content is required',
        PostLocaleEnum.ERROR_SCHEMA_EDIT_CONTENT
      )
    )
];