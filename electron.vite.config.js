import vue from "@vitejs/plugin-vue";
import { BootstrapVueNextResolver } from "bootstrap-vue-next";
import Components from "unplugin-vue-components/vite";
import { fileURLToPath, URL } from "url";
import vueDevTools from "vite-plugin-vue-devtools";

/**
 * @type {import('electron-vite').UserConfig}
 */
export default {
  main: {
    root: "./",
    base: "./",
    server: {
      host: "localhost",
      port: 3000,
    },
    plugins: [
      vue(),
      vueDevTools(),
      Components({
        resolvers: [BootstrapVueNextResolver()],
      }),
    ],
    resolve: {
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@renderer": fileURLToPath(new URL("./src/renderer", import.meta.url)),
        "@shared": fileURLToPath(new URL("./src/shared", import.meta.url)),
        "@routes": fileURLToPath(new URL("./src/routes", import.meta.url)),
        "@assets": fileURLToPath(new URL("./src/renderer/assets", import.meta.url)),
        "@components": fileURLToPath(new URL("./src/renderer/components", import.meta.url)),
        "@pages": fileURLToPath(new URL("./src/renderer/pages", import.meta.url)),
        "@models": fileURLToPath(new URL("./src/models", import.meta.url)),
        "@types": fileURLToPath(new URL("./src/@types", import.meta.url)),
        "@store": fileURLToPath(new URL("./src/stores", import.meta.url)),
      },
    },
    build: {
      outDir: "dist/main",
      rollupOptions: {
        input: "./src/main/main.js",
        external: ["fs", "path", "os", "child_process", "stream", "buffer"], // Configura os módulos do Node.js como externos
      },
    },
  },
  preload: {
    root: "./",
    base: "./",
    server: {
      host: "localhost",
      port: 3000,
    },
    plugins: [
      vue(),
      vueDevTools(),
      Components({
        resolvers: [BootstrapVueNextResolver()],
      }),
    ],
    resolve: {
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@renderer": fileURLToPath(new URL("./src/renderer", import.meta.url)),
        "@shared": fileURLToPath(new URL("./src/shared", import.meta.url)),
        "@routes": fileURLToPath(new URL("./src/routes", import.meta.url)),
        "@assets": fileURLToPath(new URL("./src/renderer/assets", import.meta.url)),
        "@components": fileURLToPath(new URL("./src/renderer/components", import.meta.url)),
        "@pages": fileURLToPath(new URL("./src/renderer/pages", import.meta.url)),
        "@models": fileURLToPath(new URL("./src/models", import.meta.url)),
        "@types": fileURLToPath(new URL("./src/@types", import.meta.url)),
        "@store": fileURLToPath(new URL("./src/stores", import.meta.url)),
      },
    },
    build: {
      rollupOptions: {
        input: "./src/main/preload.js",
        external: ["fs", "path", "os", "child_process", "stream", "buffer"], // Configura os módulos do Node.js como externos
      },
    },
  },
  renderer: {
    root: "./",
    html: "./index.html",
    base: "./",
    server: {
      host: "localhost",
      port: 3000,
    },
    plugins: [
      vue(),
      vueDevTools(),
      Components({
        resolvers: [BootstrapVueNextResolver()],
      }),
    ],
    resolve: {
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@renderer": fileURLToPath(new URL("./src/renderer", import.meta.url)),
        "@shared": fileURLToPath(new URL("./src/shared", import.meta.url)),
        "@routes": fileURLToPath(new URL("./src/routes", import.meta.url)),
        "@assets": fileURLToPath(new URL("./src/renderer/assets", import.meta.url)),
        "@components": fileURLToPath(new URL("./src/renderer/components", import.meta.url)),
        "@pages": fileURLToPath(new URL("./src/renderer/pages", import.meta.url)),
        "@models": fileURLToPath(new URL("./src/models", import.meta.url)),
        "@types": fileURLToPath(new URL("./src/@types", import.meta.url)),
        "@store": fileURLToPath(new URL("./src/stores", import.meta.url)),
      },
    },
    build: {
      rollupOptions: {
        input: "./src/renderer/main.ts",
        external: ["fs", "path", "os", "child_process", "stream", "buffer"], // Configura os módulos do Node.js como externos
      },
    },
  },
};
