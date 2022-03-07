import { EmailTemplateLangEnum } from "./types/email-template-langs";
import { enChangePasswordTemplate } from "./languages/en/change-password.template";
import { faChangePasswordTemplate } from "./languages/fa/change-password.template";
import { IEmailTemplate } from "./types/template-type";

export const changePasswordTemplate = ( lang: EmailTemplateLangEnum, email: string ): IEmailTemplate => {
  switch ( lang ) {
    case EmailTemplateLangEnum.EN:
      return enChangePasswordTemplate( email );
    case EmailTemplateLangEnum.FA:
      return faChangePasswordTemplate( email );
    default:
      return enChangePasswordTemplate( email );
  }
}; 