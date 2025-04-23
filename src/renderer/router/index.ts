import { tokenStore } from "@/store/tokenAuthStore";
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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/bots",
    name: "bots",
    component: () => import("@pages/bots/BotsView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = tokenStore();
  const isLogged = authStore.isLogged();
  if (to.meta.requiresAuth && !isLogged) {
    next({ name: "login" });
    await window.electronAPI.AlertError();
  } else {
    next();
  }
});
