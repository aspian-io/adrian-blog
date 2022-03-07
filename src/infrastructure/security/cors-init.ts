import { Express } from 'express';
import cors from 'cors';
import chalk from 'chalk';
import { commaSeparatedToArray } from 'infrastructure/string-utils/comma-separated-to-array';
import { BadRequestError } from 'infrastructure/errors/bad-request-error';
import { CoreLocaleEnum } from 'infrastructure/locales/service-locale-keys/core.locale';

/**
 * 
 * Configure CORS policy for comma separated origins passed through CORS_ORIGINS env
 * 
 * @param app - Express app instance
 */
export function corsInit ( app: Express ) {
  if ( !process.env.CORS_ORIGINS ) {
    throw new Error( chalk.bold.red( 'CORS_ORIGINS env must be defined!' ) );
  }
  const whitelist = commaSeparatedToArray( process.env.CORS_ORIGINS );
  // allow cors requests from whitelist origins and with credentials
  app.use( cors( {
    origin: ( origin, callback ) => {
      if ( origin && whitelist.indexOf( origin ) !== -1 ) {
        callback( null, true );
      } else {
        callback(
          new BadRequestError(
            'The request has been blocked by CORS policy',
            CoreLocaleEnum.ERROR_CORS
          )
        );
      }
    },
    credentials: true,
    methods: [ 'get', 'post', 'put', 'patch', 'OPTIONS', 'delete', 'DELETE' ]
  } ) );
}