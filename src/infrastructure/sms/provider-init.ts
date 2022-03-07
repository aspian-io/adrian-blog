import chalk from "chalk";
import { SettingsKeyEnum } from "models/settings/settings.model";
import { settingGetValueService } from "services/settings/get-value.service";
import { farazSMSInit } from "./faraz-sms-init";

interface ISMSProviders {
  [ providerName: string ]: () => Promise<void>;
}

export async function smsProviderInit () {
  const selectedProvider = await settingGetValueService( SettingsKeyEnum.SMS_PROVIDER );
  const providers: ISMSProviders = {
    FarazSMS: farazSMSInit
  };
  const provider = providers[ selectedProvider ];
  if ( !provider ) {
    console.log( chalk.yellow( "SMS provider not found or disabled" ) );
    return;
  }

  await provider();
}