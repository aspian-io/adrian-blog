import { BadRequestError } from 'infrastructure/errors/bad-request-error';
import { CoreLocaleEnum } from 'infrastructure/locales/service-locale-keys/core.locale';
import nodemailer, { getTestMessageUrl } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

const testHost = "smtp.ethereal.email";
const testPort = 587;
const testSecure = false;

export interface ISendMailReturnParams {
  messageId: string;
  testMessageUrl: string | false;
}

/**
 * 
 * Send email
 * 
 * @param {Mail.Options} mailOptions - Creates an object for exposing the Mail API
 * @returns {Promise<ISendMailReturnParams>} an object including messageId and testMessageUrl
 */
export const sendMail = async ( mailOptions: Mail.Options ): Promise<ISendMailReturnParams> => {
  let testAccount = process.env.NODE_ENV === "development"
    ? await nodemailer.createTestAccount()
    : null;

  const transporter = nodemailer.createTransport( {
    host: process.env.NODE_ENV === "production"
      ? process.env.MAILER_HOST
      : testHost,
    port: process.env.NODE_ENV === "production"
      ? Number( process.env.MAILER_PORT )
      : testPort,
    secure: process.env.NODE_ENV === "production"
      ? ( process.env.MAILER_SECURE === "true" ? true : false )
      : testSecure, // true for 465, false for other ports
    auth: {
      user: process.env.NODE_ENV === "production"
        ? process.env.MAILER_USER
        : testAccount?.user, // generated ethereal user
      pass: process.env.NODE_ENV === "production"
        ? process.env.MAILER_PASS
        : testAccount?.pass, // generated ethereal password
    },
  } );

  try {
    const info = await transporter.sendMail( mailOptions );

    console.log( "msg url: ", getTestMessageUrl( info ) );

    return {
      messageId: info.messageId,
      testMessageUrl: getTestMessageUrl( info )
    };
  } catch ( error ) {
    console.log( "Sendig email error: ", error );
    throw new BadRequestError( "Something went wrong sending email", CoreLocaleEnum.ERROR_400_MSG );
  }
};