import { enSuspendAccountTemplate } from "./languages/en/suspend-account.template";
import { faSuspendAccountTemplate } from "./languages/fa/suspend-account.template";
import { EmailTemplateLangEnum } from "./types/email-template-langs";
import { IEmailTemplate } from "./types/template-type";

export const suspendAccountTemplate = ( lang: EmailTemplateLangEnum, email: string, isSuspended: boolean ): IEmailTemplate => {
  switch ( lang ) {
    case EmailTemplateLangEnum.EN:
      return enSuspendAccountTemplate( email, isSuspended );
    case EmailTemplateLangEnum.FA:
      return faSuspendAccountTemplate( email, isSuspended );
    default:
      return enSuspendAccountTemplate( email, isSuspended );
  }
}; 