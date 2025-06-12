import "@/assets/scripts/color-modes";
import axios from "axios";
import { createBootstrap } from "bootstrap-vue-next";
import { createPinia } from "pinia";
import { createApp } from "vue";

// Add the necessary CSS
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "bootstrap/dist/css/bootstrap.css";

import io from "socket.io-client";
import App from "./App.vue";
import "./assets/css/main.css";
import router from "./router";

const app = createApp(App);
const bootstrap = createBootstrap();
export const pinia = createPinia();

app.use(bootstrap);
app.use(pinia);
app.use(router);

app.mount("#app");

const uri_server = import.meta.env.VITE_API_URL;

export const mainSocketio = io(uri_server, {
  autoConnect: false,
  agent: true,
});

const token = localStorage.getItem("token") as string;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const api = axios({
  headers: {
    "Content-Type": "application/json",
  },
});
export const testSocketio = io(uri_server + "/test", {
  autoConnect: false,
  agent: true,
  extraHeaders: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

mainSocketio.connect();
testSocketio.connect();

mainSocketio.on("connect", () => {
  console.log("connected!");
});

testSocketio.on("connect", () => {
  console.log("connected!");
});
