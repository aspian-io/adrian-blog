import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;
  localizedMsgKey?: string | undefined;

  constructor ( public errors: ValidationError[] ) {
    super( "Invalid request parameters" );

    // Uncomment this line if typescript target is es5 and below
    //Object.setPrototypeOf( this, RequestValidationError.prototype );
  }

  serializeErrors () {
    return this.errors.map( err => {
      return { message: err.msg.localized, field: err.param };
    } );
  }
}


/**
 * 
 * Serialize an error message for Express Validator
 * 
 * @param {string} msg - Standard message for Express Validator 
 * @param {string} localizationKey - Localization key for message translation
 * @return {Object} expressValidatorMessage - An Object consists of standard message and localization key
 */
export const validationMsgSerializer = ( msg: string, localizationKey: string ): { standard: string, localized: string; } => {
  return { standard: msg, localized: localizationKey };
};