import "@/assets/scss/main.css";
import { createBootstrap } from "bootstrap-vue-next";
import { createPinia } from "pinia";
import { createApp } from "vue";
// Add the necessary CSS
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "bootstrap/dist/css/bootstrap.css";

import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("./views/auth/LoginView.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("./views/DashboardView.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
const bootstrap = createBootstrap();
export const pinia = createPinia();
app.use(bootstrap); // Important
app.use(pinia);
app.use(router);

app.mount("#app");
