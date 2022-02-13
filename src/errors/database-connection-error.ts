import { CoreLocaleEnum } from "locales/service-locale-keys/core.locale";
import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = 'Error connecting to database';
  localizedMsgKey = CoreLocaleEnum.ERROR_DBCONNECTION_MSG;

  constructor () {
    super( 'Error connecting to database' );

    // Uncomment this line if typescript target is es5 and below
    //Object.setPrototypeOf( this, DatabaseConnectionError.prototype );
  }

  serializeErrors () {
    return [
      { message: this.reason }
    ];
  }
}