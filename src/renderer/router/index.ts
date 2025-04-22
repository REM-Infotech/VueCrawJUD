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
  }

];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
