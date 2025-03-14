import "./assets/main.css";
import "./assets/sb.css";
import "jquery/dist/jquery.min.js";
import "@popperjs/core";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import { createBootstrap } from "bootstrap-vue-next";
import "./assets/styles.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import "../plugins/axios.ts";
import axios from "axios";
function CreateApp() {
  const app = createApp(App);

  app.use(createBootstrap()); // Important
  app.use(router);

  app.mount("#app");
}
CreateApp();

// Create axios instance with improved configuration
export const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 60000, // 5 second timeout
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    // console.log("Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
