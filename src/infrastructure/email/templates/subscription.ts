import { LangEnum } from "infrastructure/locales/i18next-config";
import { enSubscribeTemplate } from "./languages/en/subscribe.template";
import { faSubscribeTemplate } from "./languages/fa/subscribe.template";
import { IEmailTemplate } from "./types/template-type";

export const subscriptionTemplate = ( lang: LangEnum, email: string, verificationLink: string ): IEmailTemplate => {
  switch ( lang ) {
    case LangEnum.EN:
      return enSubscribeTemplate( email, verificationLink );
    case LangEnum.FA:
      return faSubscribeTemplate( email, verificationLink );
    default:
      return enSubscribeTemplate( email, verificationLink );
  }
}; 