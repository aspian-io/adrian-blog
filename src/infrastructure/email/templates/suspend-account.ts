import { LangEnum } from "infrastructure/locales/i18next-config";
import { enSuspendAccountTemplate } from "./languages/en/suspend-account.template";
import { faSuspendAccountTemplate } from "./languages/fa/suspend-account.template";
import { IEmailTemplate } from "./types/template-type";

export const suspendAccountTemplate = ( lang: LangEnum, email: string, isSuspended: boolean ): IEmailTemplate => {
  switch ( lang ) {
    case LangEnum.EN:
      return enSuspendAccountTemplate( email, isSuspended );
    case LangEnum.FA:
      return faSuspendAccountTemplate( email, isSuspended );
    default:
      return enSuspendAccountTemplate( email, isSuspended );
  }
}; 