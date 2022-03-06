import { farazSendSMS, farazSMS } from "@aspianet/faraz-sms";
import { SettingsKeyEnum } from "models/settings/settings.model";
import { settingGetValueService } from 'services/settings/get-value.service';


export async function farazSMSInit () {
  const apiKey = await settingGetValueService( SettingsKeyEnum.SMS_API_KEY );
  farazSMS.init( apiKey );
}