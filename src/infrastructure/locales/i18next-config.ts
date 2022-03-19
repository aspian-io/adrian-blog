import i18next from "i18next";
import i18middleware from 'i18next-http-middleware';

import en_US from './languages/en-US/en-US.json';
import fa_IR from './languages/fa-IR/fa-IR.json';

// Website langs
export enum LangEnum {
  EN = "en",
  FA = "fa"
}

const langs: string[] = Object.values( LangEnum );

export const i18nextConfiguration = () => {
  i18next.use( i18middleware.LanguageDetector ).init( {
    preload: langs,
    resources: {
      en: {
        translation: en_US
      },
      fa: {
        translation: fa_IR
      }
    },
    fallbackLng: 'en',
    detection: {
      order: [ 'path', 'cookie', 'header', 'session', 'querystring' ],
      lookupPath: 'lng',
      lookupQuerystring: 'lng'
    }
  } );
};