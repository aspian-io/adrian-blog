import { CustomError } from "./custom-error";


export class BadRequestError extends CustomError {
  statusCode = 400;
  localizedMsgKey?: string | undefined;

  constructor ( public message: string, public localizedMessageKey?: string ) {
    super( message );
    this.localizedMsgKey = localizedMessageKey;
    // Uncomment this line if typescript target is es5 and below
    //Object.setPrototypeOf( this, BadRequestError.prototype );
  }

  serializeErrors () {
    return [ { message: this.message } ];
  }
}