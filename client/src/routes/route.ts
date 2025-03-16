export const routes = [
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
