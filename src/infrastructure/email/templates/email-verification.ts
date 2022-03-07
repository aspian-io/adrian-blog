import { EmailTemplateLangEnum } from "./types/email-template-langs";
import { enEmailVerificationTemplate } from "./languages/en/email-verification.template";
import { faEmailVerificationTemplate } from "./languages/fa/email-verification.template";
import { IEmailTemplate } from "./types/template-type";

export const emailVerificationTemplate = ( lang: EmailTemplateLangEnum, email: string, verificationLink: string ): IEmailTemplate => {
  switch ( lang ) {
    case EmailTemplateLangEnum.EN:
      return enEmailVerificationTemplate( email, verificationLink );
    case EmailTemplateLangEnum.FA:
      return faEmailVerificationTemplate( email, verificationLink );
    default:
      return enEmailVerificationTemplate( email, verificationLink );
  }
}; 