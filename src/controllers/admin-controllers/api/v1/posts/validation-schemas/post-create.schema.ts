import { body } from 'express-validator';
import { validationMsgSerializer } from 'infrastructure/errors/request-validation-error';
import { PostLocaleEnum } from 'infrastructure/locales/service-locale-keys/posts.locale';

export const postCreateSchema = [
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
    ),
  body( 'taxonomies' )
    .isArray( { min: 1 } )
    .withMessage(
      validationMsgSerializer(
        'A post needs to have at least one taxonomy',
        PostLocaleEnum.ERROR_SCHEMA_CREATE_TAXONOMIES
      )
    )
];