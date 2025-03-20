import "@popperjs/core";
import axios from "axios";
import { createBootstrap } from "bootstrap-vue-next";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "datatables.net-select";
import jQuery from "jquery";
import "jquery/dist/jquery.min.js";
import { createApp } from "vue";
import "../plugins/axios.ts";
import App from "./App.vue";
import "./assets/main.css";
import "./assets/styles.css";
import router from "./routes";

export const $ = jQuery;

function CreateApp() {
  const app = createApp(App);

  app.use(createBootstrap()); // Important
  app.use(router);

  app.mount("#app");
}
CreateApp();

// Create axios instance with improved configuration
export const api = axios.create({
  baseURL: "https://homolog.robotz.dev",
  withXSRFToken: true,
  withCredentials: true,
  xsrfCookieName: "access_token_cookie",
  xsrfHeaderName: "X-CSRF-TOKEN",
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log("Request:", config.method?.toUpperCase(), config.url);
    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
