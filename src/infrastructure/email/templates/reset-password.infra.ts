import { EmailTemplateLangEnum } from "./types/email-template-langs.infra";
import { enEmailResetPasswordTemplate } from "./languages/en/reset-pass-template.infra";
import { faEmailResetPasswordTemplate } from "./languages/fa/reset-pass-template.infra";
import { IEmailTemplate } from "./types/template-type.infra";

export const resetPasswordEmailTemplate = ( lang: EmailTemplateLangEnum, email: string, resetLink: string ): IEmailTemplate => {
  switch ( lang ) {
    case EmailTemplateLangEnum.EN:
      return enEmailResetPasswordTemplate( email, resetLink );
    case EmailTemplateLangEnum.FA:
      return faEmailResetPasswordTemplate( email, resetLink );
    default:
      return enEmailResetPasswordTemplate( email, resetLink );
  }
}; 