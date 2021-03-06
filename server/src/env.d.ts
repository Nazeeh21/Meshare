declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    SESSION_SECRET: string;
    REDIS_URL: string;
    DATABASE_URL: string;
    GITHUB_CLIENT_SECRET: string;
    GITHUB_CLIENT_ID: string;
    CORS_ORIGIN: string;
    GITHUB_CALLBACK_URL: string;
    GITHUB_REDIRECT_URL: string;
  }
}