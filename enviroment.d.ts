export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BASE_URL_API: string;
    }
  }
}
