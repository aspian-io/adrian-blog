import { farazCreatePattern, IFarazCreatePatternResult } from "@aspianet/faraz-sms";
import { BadRequestError } from "infrastructure/errors/bad-request-error";
import { SMSLocaleEnum } from "infrastructure/locales/service-locale-keys/sms.locale";
import { SettingsKeyEnum } from "models/settings/settings.model";
import { settingGetValueService } from "services/settings/get-value.service";

interface ISendSMSHandler {
  [ provider: string ]: ( pattern: string, description: string, isShared: boolean ) => Promise<IFarazCreatePatternResult>;
}

export async function smsCreatePattern ( pattern: string, description: string, isShared: boolean = false ) {
  const provider = await settingGetValueService( SettingsKeyEnum.SMS_PROVIDER );
  const sendPatternSMSHandlers: ISendSMSHandler = {
    FarazSMS: farazCreatePattern
  };

  const sendPatternSMSHandler = sendPatternSMSHandlers[ provider ];
  if ( !sendPatternSMSHandler ) {
    // Provider not found or disabled
    throw new BadRequestError( "SMS provider disabled or not found", SMSLocaleEnum.ERROR_PROVIDER );
  }

  return await sendPatternSMSHandler( pattern, description, isShared );
} 