import { LangEnum } from "infrastructure/locales/i18next-config";
import { enEmailVerificationTemplate } from "./languages/en/email-verification.template";
import { faEmailVerificationTemplate } from "./languages/fa/email-verification.template";
import { IEmailTemplate } from "./types/template-type";

export const emailVerificationTemplate = ( lang: LangEnum, email: string, verificationLink: string ): IEmailTemplate => {
  switch ( lang ) {
    case LangEnum.EN:
      return enEmailVerificationTemplate( email, verificationLink );
    case LangEnum.FA:
      return faEmailVerificationTemplate( email, verificationLink );
    default:
      return enEmailVerificationTemplate( email, verificationLink );
  }
}; 