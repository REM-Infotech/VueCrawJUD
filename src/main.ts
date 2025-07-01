import "@/assets/scripts/color-modes";
import { api } from "@/defaults/axios";
import { createBootstrap } from "bootstrap-vue-next";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "bootstrap/dist/css/bootstrap.css";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/main.css";
import manager from "./resouces/socketio";
import router from "./router";

const app = createApp(App);
const bootstrap = createBootstrap();
export const pinia = createPinia();

app.use(bootstrap);
app.use(pinia);
app.use(router);

interface ResponseError {
  response?: {
    status?: number;
  };
}

api.interceptors.response.use(
  (response) => response,
  (error: ResponseError) => {
    if (error.response && (error.response.status === 401 || error.response.status == 422)) {
      router.push({ name: "login" });
    }
    return Promise.reject(error);
  },
);
export const mainSocket = manager.socket("/");

app.mount("#app");
