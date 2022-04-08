import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import path from "path";
import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";

// https://vitejs.dev/config/

export default () => {
  const env = dotenv.config({ path: `../.env.local` });
  dotenvExpand.expand(env);
  return defineConfig({
    base: "./",
    server: {
      // vite server configs, for details see [vite doc](https://vitejs.dev/config/#server-host)
      port: 3000,
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
