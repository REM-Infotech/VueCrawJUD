import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import Components from "unplugin-vue-components/vite";
import { BootstrapVueNextResolver } from "bootstrap-vue-next";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Components({
      resolvers: [BootstrapVueNextResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./client/src", import.meta.url)),
    },
  },
  server: {
    allowedHosts: true,
    proxy: {
      "/auth": {
        target: "http://localhost:5000/auth",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, ""),
      },
      "/logout": {
        target: "http://localhost:5000/logout",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/logout/, ""),
      },
      "/executions": {
        target: "http://localhost:5000/executions",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/executions/, ""),
      },
    },
  },
});
