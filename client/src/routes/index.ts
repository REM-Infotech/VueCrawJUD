import { createRouter, createWebHistory } from "vue-router";
import { api } from "../main";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("./handler/NotFoundView.vue"),
    meta: { requiresAuth: true },
    mount() {
      $("#app").addClass("bg-purple");
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./login/LoginView.vue"),
  },
  {
    path: "/",
    name: "index",
    component: () => import("./dashboard/DashboardView.vue"),
    meta: { requiresAuth: true },
    mount() {
      $("#app").addClass("bg-purple");
    },
  },
  {
    path: "/execucoes",
    name: "executions",
    component: () => import("./execution/ExecutionView.vue"),
    meta: { requiresAuth: true },
    mount() {
      $("#app").addClass("bg-purple");
    },
  },
  {
    path: "/bot/form/:id",
    name: "bot_form",
    component: () => import("./bot/BotFormView.vue"),
    meta: { requiresAuth: true },
    mount() {
      $("#app").addClass("bg-purple");
    },
  },
  {
    path: "/bots",
    name: "bot_dashboard",
    component: () => import("./bot/BotDashboardView.vue"),
    meta: { requiresAuth: true },
    mount() {
      $("#app").addClass("bg-purple");
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isAuth = !!sessionStorage.getItem("token");

  const response = await api.get("/");

  if (response.status === 401) {
    sessionStorage.removeItem("token");
    sessionStorage.setItem("message", "Sessão expirada, faça login novamente!");
    next({ name: "login" });
  }

  if (to.meta.requiresAuth && !isAuth) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
