import { createBootstrap } from "bootstrap-vue-next";
import { createPinia } from "pinia";
import { createApp } from "vue";

// Add the necessary CSS
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "bootstrap/dist/css/bootstrap.css";

import "./assets/main.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const bootstrap = createBootstrap();
export const pinia = createPinia();

app.use(bootstrap);
app.use(pinia);
app.use(router);

app.mount("#app");
