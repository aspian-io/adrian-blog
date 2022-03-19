import { LangEnum } from "infrastructure/locales/i18next-config";
import { enChangePasswordTemplate } from "./languages/en/change-password.template";
import { faChangePasswordTemplate } from "./languages/fa/change-password.template";
import { IEmailTemplate } from "./types/template-type";

export const changePasswordTemplate = ( lang: LangEnum, email: string ): IEmailTemplate => {
  switch ( lang ) {
    case LangEnum.EN:
      return enChangePasswordTemplate( email );
    case LangEnum.FA:
      return faChangePasswordTemplate( email );
    default:
      return enChangePasswordTemplate( email );
  }
}; 