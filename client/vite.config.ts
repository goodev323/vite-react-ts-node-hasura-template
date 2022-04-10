import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import path from "path";
import { defineConfig } from "vite";

export default () => {
  dotenv.config({ path: `../.env.local` });
  dotenv.config({ path: `./.env` });
  const env = dotenv.config();
  dotenvExpand.expand(env);
  return defineConfig({
    base: "./",
    server: {
      port: 3000,
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/"),
      },
    },
  });
};
