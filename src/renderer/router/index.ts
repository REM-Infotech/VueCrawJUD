import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("@pages/login/LoginView.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@pages/dashboard/DashboardView.vue"),
  },
  {
    path: "/bots",
    name: "bots",
    component: () => import("@pages/bots/BotsView.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
