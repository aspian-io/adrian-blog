import { farazCredit } from "@aspianet/faraz-sms";
import { SettingsKeyEnum } from "models/settings/settings.model";
import { settingGetValueService } from "services/settings/get-value.service";

export type SMSCreditResult = Promise<ISMSCreditHandlerResult>;

export interface ISMSCreditHandlerResult {
  credit: number;
  smsCost: number;
  minCredit: number;
  currencyUnit: ISMSHandlerCurrencyUnit;
  sendingSMSAllowed: boolean;
}

enum ISMSHandlerCurrencyUnit {
  USD = "USD",
  CAD = "CAD",
  EURO = "EURO",
  IRR = "IRR"
}

interface ISMSCreditHandler {
  [ provider: string ]: () => SMSCreditResult;
}

/**
 * 
 * Get SMS provider remaining credit and its currency unit and is the credit enough to send SMS
 * 
 * @returns An object of type `ISMSCreditHandlerResult`
 */
export async function smsCreditService (): SMSCreditResult {
  const provider = await settingGetValueService( SettingsKeyEnum.SMS_PROVIDER );
  const sendSMSHandlers: ISMSCreditHandler = {
    FarazSMS: farazCreditHandler
  };

  const sendSMSHandler = sendSMSHandlers[ provider ];
  if ( !sendSMSHandler ) {
    // Provider not found or disabled
    return {
      credit: 0,
      smsCost: 0,
      minCredit: 0,
      currencyUnit: ISMSHandlerCurrencyUnit.IRR,
      sendingSMSAllowed: false
    };
  }
  return await sendSMSHandler();
}

// FarazSMS get credit handler
async function farazCreditHandler (): Promise<ISMSCreditHandlerResult> {
  const credit = await farazCredit();
  const roundedCredit = Math.ceil( credit.data.credit );
  const minCredit = 10000;
  return {
    credit: roundedCredit,
    smsCost: 642,
    minCredit,
    currencyUnit: ISMSHandlerCurrencyUnit.IRR,
    sendingSMSAllowed: roundedCredit > minCredit
  };
}