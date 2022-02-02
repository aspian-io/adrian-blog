import { body } from 'express-validator';
import { validationMsgSerializer } from '../../../errors/request-validation-error';
import { TaxonomyLocaleEnum } from '../../../locales/service-locale-keys/taxonomies.locale';

export const taxonomyCreateSchema = [
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