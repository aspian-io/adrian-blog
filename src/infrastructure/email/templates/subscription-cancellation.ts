import { LangEnum } from "infrastructure/locales/i18next-config";
import { enUnsubscribeTemplate } from "./languages/en/unsubscribe.template";
import { faUnsubscribeTemplate } from "./languages/fa/unsubscribe.template";
import { IEmailTemplate } from "./types/template-type";

export const subscriptionCancellationTemplate = ( lang: LangEnum, email: string, verificationLink: string ): IEmailTemplate => {
  switch ( lang ) {
    case LangEnum.EN:
      return enUnsubscribeTemplate( email, verificationLink );
    case LangEnum.FA:
      return faUnsubscribeTemplate( email, verificationLink );
    default:
      return enUnsubscribeTemplate( email, verificationLink );
  }
}; 