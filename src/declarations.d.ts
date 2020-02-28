declare module "@okta/okta-sdk-nodejs";
declare module "@okta/oidc-middleware";
declare module "dotenv";

declare namespace NodeJS
{
  export interface ProcessEnv
  {
    NODE_ENV: "development" | "production" | "test";
    OKTA_AERARIUM_LOGIN_TOKEN: string;
    OKTA_CLIENT_ID: string;
    OKTA_CLIENT_SECRET: string;
    OKTA_ORG_URL: string;
    EXPRESS_SESSION_SECRET: string;
  }
}
