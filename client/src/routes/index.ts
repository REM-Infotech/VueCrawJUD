import { createRouter, createWebHistory } from "vue-router";
import { api } from "../main";
import { useModal } from "bootstrap-vue-next";
import jQuery from "jquery";

const $ = jQuery;

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("./handler/NotFoundView.vue"),
    meta: { requiresAuth: true },
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
  },
  {
    path: "/execucoes",
    name: "executions",
    component: () => import("./execution/ExecutionView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/bot/form/:id",
    name: "bot_form",
    component: () => import("./bot/BotFormView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/bots",
    name: "bot_dashboard",
    component: () => import("./bot/BotDashboardView.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { show, hide } = useModal("modal-center");

  const isAuth = !!sessionStorage.getItem("token");

  if (to.meta.requiresAuth) {
    show();
    if (!isAuth) {
      return next({ name: "login" });
    }
  }

  if (isAuth) {
    const response = await api.get("/");

    if (response.status === 401) {
      sessionStorage.removeItem("token");
      sessionStorage.setItem("message", "Sessão expirada, faça login novamente!");
      return next({ name: "login" });
    }
  }

  next();
});

// Global afterEach hook para gerenciar a classe do app
router.afterEach((to) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { show, hide } = useModal("modal-center");
  if (to.meta.requiresAuth) {
    $("#app").addClass("bg-purple");
    setTimeout(() => {
      hide();
    }, 100);
  } else {
    if ($("#app").hasClass("bg-purple")) {
      $("#app").removeClass("bg-purple");
    }
    $("#app").addClass("bg-indigo");
  }
});

export default router;
