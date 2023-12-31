declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      DB_URI: string
      JWT_SECRET_KEY: string
      JWT_SECRET_KEY_REFRESH: string
      JWT_EXPIRES_IN: string
      EMAIL_PASSWORD: string
      EMAIL_ADRESS: string
      STRIPE_SECRET_KEY: string
      CLIENT_URL: string
      STRIPE_ENDPOINT_SECRET: string
      AWS_ACCESS_KEY_ID: string
      AWS_SECRET_ACCESS_KEY: string
      AWS_REGION: string
      AWS_S3_BUCKET_NAME: string
    }
  }
}
