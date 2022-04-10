/// <reference types:string

interface ImportMetaEnv {
  readonly VITE_SOME_CONFIG_KEY: string; // write config you need
  readonly VITE_HASURA_ENDPOINT: string;
  readonly VITE_HASURA_ADMIN_SECRET: string;
  readonly VITE_AUTH0_DOMAIN: string;
  readonly VITE_AUTH0_CLIENT_ID: string;
  readonly VITE_AUTH0_REDIRECT_URI: string;
  readonly VITE_AUTH0_AUDIENCE: string;
  readonly VITE_AUTH0_SCOPE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
