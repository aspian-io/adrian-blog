import { CoreLocaleEnum } from "infrastructure/locales/service-locale-keys/core.locale";
import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;
  localizedMsgKey = CoreLocaleEnum.ERROR_404_MSG;

  constructor () {
    super( 'Not found' );

    // Uncomment this line if typescript target is es5 and below
    //Object.setPrototypeOf( this, NotFoundError.prototype );
  }

  serializeErrors () {
    return [ { message: 'Not Found' } ];
  }
}