import { useModal } from "bootstrap-vue-next";
import { createRouter, createWebHistory } from "vue-router";
import { $ } from "../main";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("./handler/NotFoundView.vue"),
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
    path: "/bots",
    name: "bot_dashboard",
    component: () => import("./bot/BotDashboardView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/logs_bot/:pid",
    name: "logs_bot",
    component: () => import("./logs/LogBotView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/configs",
    name: "config",
    component: () => import("./admin/ConfigView.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const { show, hide } = useModal("modal-load");
  if (to.meta.requiresAuth) {
    if ($("#app").hasClass("bg-indigo")) {
      $("#app").removeClass("bg-indigo");
      $("#app").addClass("bg-purple");
    }

    show();

    setTimeout(() => {
      hide();
    }, 1000);
  } else {
    if ($("#app").hasClass("bg-purple")) {
      $("#app").removeClass("bg-purple");
    }
    $("#app").addClass("bg-indigo");
  }
});

export default router;
