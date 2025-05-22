import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("@/views/auth/LoginView.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/dash/DashboardView.vue"),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
