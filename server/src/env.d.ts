declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    DB_NAME: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    GITHUB_CLIENT_SECRET: string;
    GITHUB_CLIENT_ID: string;
    CORS_ORIGIN: string;
  }
}