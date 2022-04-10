import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import path from "path";
import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";

export default () => {
  dotenv.config({ path: `../.env.local` });
  dotenv.config({ path: `./.env` });
  const env = dotenv.config();
  dotenvExpand.expand(env);
  return defineConfig({
    base: "./",
    server: {
      port: 3001,
    },
    build: {
      outDir: "./dist",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/"),
      },
    },
    plugins: [
      ...VitePluginNode({
        adapter: "express",
        appPath: "./src/index.ts",
        exportName: "viteNodeApp",
        tsCompiler: "esbuild",
      }),
    ],
  });
};
