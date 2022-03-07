import { farazSendPattern, farazSendSMS } from "@aspianet/faraz-sms";
import { SettingsKeyEnum } from "models/settings/settings.model";
import { settingGetValueService } from "services/settings/get-value.service";
import { smsPatternType } from "./helpers/types";

interface ISendSMSHandler {
  [ provider: string ]: ( message: string, recipients: string[] ) => Promise<void>;
}

interface ISendPatternSMSHandler {
  [ provider: string ]: <T>( patternName: PatternNameEnum, recipient: string, values: T ) => Promise<void>;
}

export enum PatternNameEnum {
  SMS_VERIFICATION_CODE_PATTERN = SettingsKeyEnum.SMS_VERIFICATION_CODE_PATTERN
}

/**
 * 
 * Send ordinary SMS and it is slower than sending through patterns
 * 
 * @param {string} message - Text to send
 * @param {string[]} recipients - An array of recipients
 * @returns {Promise<void>} - a void Promise
 */
export async function sendSMS ( message: string, recipients: string[] ): Promise<void> {
  const provider = await settingGetValueService( SettingsKeyEnum.SMS_PROVIDER );
  const sendSMSHandlers: ISendSMSHandler = {
    FarazSMS: farazSendSMSHandler
  };

  const sendSMSHandler = sendSMSHandlers[ provider ];
  if ( !sendSMSHandler ) {
    // Provider not found or disabled
    return;
  }

  await sendSMSHandler( message, recipients );
}

/**
 * 
 * Send SMS fast through predefined patterns
 * 
 * @param {string} recipient - Recipient mobile phone number
 * @param {T} values - Pattern values that must send and is an object of generic type T
 * @returns {Promise<void>} a void Promise
 */
export async function sendPatternSMS<T extends smsPatternType> ( patternName: PatternNameEnum, recipient: string, values: T ): Promise<void> {
  const provider = await settingGetValueService( SettingsKeyEnum.SMS_PROVIDER );
  const sendPatternSMSHandlers: ISendPatternSMSHandler = {
    FarazSMS: farazSendPatternSMSHandler
  };

  const sendPatternSMSHandler = sendPatternSMSHandlers[ provider ];
  if ( !sendPatternSMSHandler ) {
    // Provider not found or disabled
    return;
  }

  await sendPatternSMSHandler<T>( patternName, recipient, values );
}




// FarazSMS send sms handler
async function farazSendSMSHandler ( message: string, recipients: string[] ) {
  const originator = await settingGetValueService( SettingsKeyEnum.SMS_ORIGINATOR );
  if ( originator === '0' ) {
    return;
  }

  await farazSendSMS( originator, recipients, message );
}

// FarazSMS send pattern sms handler
async function farazSendPatternSMSHandler<T> ( patternName: PatternNameEnum, recipient: string, values: T ) {
  const patternSettingKey: SettingsKeyEnum = SettingsKeyEnum[ <any>patternName as keyof typeof SettingsKeyEnum ];
  const patternCode = await settingGetValueService( patternSettingKey );
  const originator = await settingGetValueService( SettingsKeyEnum.SMS_ORIGINATOR );
  if ( originator === '0' || !patternCode ) {
    return;
  }

  await farazSendPattern<T>( patternCode, originator, recipient, values );
}