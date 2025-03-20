import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import { BootstrapVueNextResolver } from "bootstrap-vue-next";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import vueDevTools from "vite-plugin-vue-devtools";

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

    // proxy: {
    //   "/acquire_credentials": {
    //     target: "http://localhost:5000/acquire_credentials",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/acquire_credentials/, ""),
    //   },
    //   "/auth": {
    //     target: "http://localhost:5000/auth",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/auth/, ""),
    //   },
    //   "/logout": {
    //     target: "http://localhost:5000/logout",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/logout/, ""),
    //   },
    //   "/executions": {
    //     target: "http://localhost:5000/executions",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/executions/, ""),
    //   },
    //   "/bots_list": {
    //     target: "http://localhost:5000/bots_list",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/bots_list/, ""),
    //   },
    //   "/acquire_credentials": {
    //     target: "http://localhost:5000/acquire_credentials",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/acquire_credentials/, ""),
    //   },
    // },
  },
});
