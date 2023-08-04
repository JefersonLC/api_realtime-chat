import { cleanEnv, port, str } from 'envalid'

export function validateEnv() {
  cleanEnv(process.env, {
    PORT: port(),
    DATABASE_URL: str(),
    GOOGLE_CLIENT_ID: str(),
    GOOGLE_CLIENT_SECRET: str(),
    GOOGLE_CALLBACK_URL: str(),
    SECRET_KEY: str(),
    CLIENT_APP_URL: str(),
  })
}
