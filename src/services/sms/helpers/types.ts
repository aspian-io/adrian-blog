export type smsPatternType = ISmsPatternGeneralValues | ISmsPatternVerificationValues;

export interface ISmsPatternGeneralValues {
  [ key: string ]: any;
}

export interface ISmsPatternVerificationValues {
  name: string;
  verificationCode: string;
}

