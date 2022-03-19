import { enEmailResetPasswordTemplate } from "./languages/en/reset-pass.template";
import { faEmailResetPasswordTemplate } from "./languages/fa/reset-pass.template";
import { IEmailTemplate } from "./types/template-type";
import { LangEnum } from "infrastructure/locales/i18next-config";

export const resetPasswordEmailTemplate = ( lang: LangEnum, email: string, resetLink: string ): IEmailTemplate => {
  switch ( lang ) {
    case LangEnum.EN:
      return enEmailResetPasswordTemplate( email, resetLink );
    case LangEnum.FA:
      return faEmailResetPasswordTemplate( email, resetLink );
    default:
      return enEmailResetPasswordTemplate( email, resetLink );
  }
}; 