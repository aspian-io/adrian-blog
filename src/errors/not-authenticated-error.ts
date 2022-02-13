import { CoreLocaleEnum } from 'locales/service-locale-keys/core.locale';
import { CustomError } from './custom-error';

export class NotAuthenticatedError extends CustomError {
  statusCode = 401;
  localizedMsgKey = CoreLocaleEnum.ERROR_401_MSG;

  constructor () {
    super( 'Not Authenticated' );

    // Uncomment this line if typescript target is es5 and below
    //Object.setPrototypeOf( this, NotAuthenticatedError.prototype );
  }

  serializeErrors () {
    return [ { message: 'Not Authenticated' } ];
  }
}