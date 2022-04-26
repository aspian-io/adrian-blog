import { body } from 'express-validator';
import { validationMsgSerializer } from 'infrastructure/errors/request-validation-error';
import { LangEnum } from 'infrastructure/locales/i18next-config';
import { CoreLocaleEnum } from 'infrastructure/locales/service-locale-keys/core.locale';
import { TaxonomyLocaleEnum } from 'infrastructure/locales/service-locale-keys/taxonomies.locale';

export const taxonomyCreateSchema = [
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
  body( 'type' )
    .not()
    .isEmpty()
    .withMessage( validationMsgSerializer( 'Taxonomy type is required', TaxonomyLocaleEnum.ERROR_SCHEMA_CREATE_TYPE ) ),
  body( 'term' )
    .not()
    .isEmpty()
    .withMessage( validationMsgSerializer( 'Taxonomy term is required', TaxonomyLocaleEnum.ERROR_SCHEMA_CREATE_TERM_EMPTY ) )
    .isLength( { max: 60 } )
    .withMessage( validationMsgSerializer(
      "Taxonomy term's length must be more than 1 and up to 60",
      TaxonomyLocaleEnum.ERROR_SCHEMA_CREATE_TERM_LENGTH
    ) ),
];