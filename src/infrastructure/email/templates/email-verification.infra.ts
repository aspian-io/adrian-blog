import { EmailTemplateLangEnum } from "./types/email-template-langs.infra";
import { enEmailVerificationTemplate } from "./languages/en/email-verification-template.infra";
import { faEmailVerificationTemplate } from "./languages/fa/email-verification-template.infra";
import { IEmailTemplate } from "./types/template-type.infra";

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