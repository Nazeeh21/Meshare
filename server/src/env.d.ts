declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    DB_NAME: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    CORS_ORIGIN: string;
  }
}