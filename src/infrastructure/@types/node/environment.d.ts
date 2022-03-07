namespace NodeJS {
  interface ProcessEnv {
    BRAND_NAME?: string;
    DEFAULT_LANG?: string;
    PROTOCOL?: string;
    HOST?: string;
    BASE_URL?: string;
    CORS_ORIGINS?: string;
    SUPPORT_PATH?: string;
    RESET_PASS_PATH?: string;
    EMAIL_VERIFICATION_PATH?: string;
    EMAIL?: string;
    DB_HOST?: string;
    USING_CACHE?: 'true' | 'false';
    REDIS_URL?: string;
    MAILER_HOST?: string;
    MAILER_PORT?: string;
    MAILER_SECURE?: 'true' | 'false';
    MAILER_USER?: string;
    MAILER_PASS?: string;
    SMS_PROVIDER?: 'FarazSMS' | 'twilio' | 'false';
    SMS_ORIGINATOR?: string;
    SMS_API_KEY?: string;
    SMS_PATTERN_CODE__VERIFICATION?: string;
    LOGGER_CAPPED_SIZE_IN_MB?: string;
    NODE_ENV: 'development' | 'production';
    PORT?: string;
    JWT_KEY?: string;
    JWT_EXP_IN_MINS?: string;
    REFRESH_TOKEN_EXP_IN_DAYS?: string;
    S3_ENDPOINT?: string;
    S3_REGION?: string;
    S3_ACCESS_KEY?: string;
    S3_SECRET_KEY?: string;
    S3_ACL?: string;
    S3_FORTH_PATH_STYLE?: 'true' | 'false';
    S3_STREAMING_UPLOAD?: 'true' | 'false';
    S3_BUCKET?: string;
    POSTCOMMENT_REPLY_ALLOWED_LEVEL?: string;
  }
}
