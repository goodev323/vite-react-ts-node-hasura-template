/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SOME_CONFIG_KEY: string; // write config you need
  readonly VITE_HASURA_ENDPOINT: string;
  readonly VITE_HASURA_ADMIN_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
