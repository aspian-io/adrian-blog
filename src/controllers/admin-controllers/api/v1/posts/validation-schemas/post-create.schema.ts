import { body } from 'express-validator';
import { validationMsgSerializer } from 'infrastructure/errors/request-validation-error';
import { LangEnum } from 'infrastructure/locales/i18next-config';
import { CoreLocaleEnum } from 'infrastructure/locales/service-locale-keys/core.locale';
import { PostLocaleEnum } from 'infrastructure/locales/service-locale-keys/posts.locale';

export const postCreateSchema = [
  body( 'lang' )
    .not()
    .isEmpty()
    .isIn( Object.values( LangEnum ) )
    .withMessage(
      validationMsgSerializer(
        'Language cannot be empty and must be correctly specified',
        CoreLocaleEnum.ERROR_LANG
      )
    ),
  body( 'title' )
    .not()
    .isEmpty()
    .withMessage(
      validationMsgSerializer(
        'Post title is required',
        PostLocaleEnum.ERROR_SCHEMA_CREATE_TITLE
      )
    ),
  body( 'excerpt' )
    .not()
    .isEmpty()
    .withMessage(
      validationMsgSerializer(
        'Post excerpt is required',
        PostLocaleEnum.ERROR_SCHEMA_CREATE_EXCERPT
      )
    ),
  body( 'content' )
    .not()
    .isEmpty()
    .withMessage(
      validationMsgSerializer(
        'Post content is required',
        PostLocaleEnum.ERROR_SCHEMA_CREATE_CONTENT
      )
    )
];