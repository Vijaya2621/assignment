export const config: any = {
  local: {
    port: process.env.PORT,
    url: 'http://localhost:8005',
    db: {
      host: process.env.DB_HOST,
      userName: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      dialect: 'mysql',
      port: process.env.DB_PORT,
      logging: true,
    },
    secret: {
      jwt: process.env.JWT_SECRET,
    },
  },
};

// export const JWT_SECRET = process.env.JWT_SECRET;
// export const SENDER_MAIL_ID = process.env.SENDER_MAIL_ID;
// export const SENDER_MAIL_PW = process.env.SENDER_MAIL_PW;
// export const FORGOT_PW_URL = process.env.FORGOT_PW_URL;
// export const CREATE_PW_URL = process.env.CREATE_PW_URL;
// export const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION;
// export const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION;
// export const S3_REGION = process.env.S3_REGION;
// export const S3_BUCKET = process.env.S3_BUCKET;
// export const S3_BASE_URL = process.env.S3_BASE_URL;
// export const S3_PUBLIC_KEY = process.env.S3_PUBLIC_KEY;
// export const S3_PRIVATE_KEY = process.env.S3_PRIVATE_KEY;
