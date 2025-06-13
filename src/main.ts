import "@/assets/scripts/color-modes";

import "@/defaults/axios";
import { createBootstrap } from "bootstrap-vue-next";
import { createPinia } from "pinia";
import { createApp } from "vue";
// Add the necessary CSS
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "bootstrap/dist/css/bootstrap.css";

import axios from "axios";
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

export const api = axios.create();
export const mainSocket = manager.socket("/api-socketio");

app.mount("#app");
