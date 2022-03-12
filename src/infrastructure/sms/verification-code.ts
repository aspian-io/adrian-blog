import { redisWrapper } from "infrastructure/database/redis/redis-client";
import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { AuthLocaleEnum } from "infrastructure/locales/service-locale-keys/auth.locale";
import { CoreLocaleEnum } from "infrastructure/locales/service-locale-keys/core.locale";
import { sixDigitRandomCodeGen } from "infrastructure/security/six-digit-code-gen";

/**
 * Generate or get temporary verification code
 */
export class VerificationCode {
  private _verificationCodeKey: string;
  private _expiration: number;

  /**
   * Initialize class properties to generate or get temporary verification code
   * @param {string} userId - User Id
   * @param {number} expiration - Expiration time in seconds - default is 120 seconds or 2 minutes.
   */
  public constructor ( userId: string, expiration: number = 2 * 60 ) {
    this._verificationCodeKey = `verification-code-${ userId }`;
    this._expiration = expiration;
  }

  /**
   * Generate verification code
   * @returns {Promise<string>} - Six digit verification code
   */
  public async generateCode (): Promise<string> {
    const verificationCode = sixDigitRandomCodeGen();
    try {
      const existedCode = await redisWrapper.client.get( this._verificationCodeKey );
      if ( existedCode ) {
        await redisWrapper.client.del( this._verificationCodeKey );
      }
      await redisWrapper.client
        .set( this._verificationCodeKey, verificationCode, {
          EX: this._expiration,
          NX: true
        } );
      return verificationCode.toString();
    } catch ( error ) {
      throw new BadRequestError( "Something went wrong generating verification code", CoreLocaleEnum.ERROR_400_MSG );
    }
  }

  /**
   * Get a user's verification code by their id
   * @returns {Promise<string>} - Six digit verification code
   */
  public async getCode (): Promise<string> {
    try {
      const verificationCode = await redisWrapper.client.get( this._verificationCodeKey );
      if ( !verificationCode ) {
        throw new BadRequestError(
          "The verification code has been expired or is undefined",
          AuthLocaleEnum.ERROR_VERIFICATION_CODE_EXPIRED
        );
      }
      return verificationCode;
    } catch ( error ) {
      throw new BadRequestError( "Something went wrong generating verification code", CoreLocaleEnum.ERROR_400_MSG );
    }
  }

  /**
   * Check user's supplied verification code for validity
   * @param {string} suppliedCode - Supplied code by the user
   * @returns {Promise<boolean>} - True if the code is valid otherwise false
   */
  public async isCodeValid ( suppliedCode: string ): Promise<boolean> {
    try {
      const producedCode = await this.getCode();
      return suppliedCode === producedCode;
    } catch ( error ) {
      throw new BadRequestError(
        "The verification code has been expired or is undefined",
        AuthLocaleEnum.ERROR_VERIFICATION_CODE_EXPIRED
      );
    }
  }

  /**
   * Delete generated code from Redis
   */
  public async removeCode (): Promise<void> {
    try {
      await redisWrapper.client
        .del( this._verificationCodeKey );
    } catch ( error ) {
      throw new BadRequestError(
        "The verification code has been expired or is undefined",
        AuthLocaleEnum.ERROR_VERIFICATION_CODE_EXPIRED
      );
    }
  }
}