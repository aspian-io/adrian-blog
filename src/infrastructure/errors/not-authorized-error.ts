import { CoreLocaleEnum } from 'infrastructure/locales/service-locale-keys/core.locale';
import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  statusCode = 403;
  localizedMsgKey = CoreLocaleEnum.ERROR_403_MSG;

  constructor () {
    super( 'Not Authorized' );

    // Uncomment this line if typescript target is es5 and below
    //Object.setPrototypeOf( this, NotAuthorizedError.prototype );
  }

  serializeErrors () {
    return [ { message: 'Not Authorized' } ];
  }
}