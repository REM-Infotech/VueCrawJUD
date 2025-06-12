import { appCookies } from "@/main";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      redirect: {
        name: "login",
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/auth/LoginView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/views/dashboard/DashboardView.vue"),
      meta: {
        isAuth: true,
      },
    },
    {
      path: "/bots",
      name: "bots",
      component: () => import("@/views/bots/RobotsView.vue"),
      meta: {
        isAuth: true,
      },
    },
    {
      path: "/executions",
      name: "executions",
      component: () => import("@/views/EmptyView.vue"),
      meta: {
        isAuth: true,
      },
    },
    {
      path: "/scheduled",
      name: "scheduled",
      component: () => import("@/views/EmptyView.vue"),
      meta: {
        isAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.log(to.name);

  const isAuth = !!to.meta.isAuth;
  const access_token = appCookies.cookiesApp;
  console.log(isAuth, access_token);
  if (isAuth && !!access_token) next({ name: "login" });
  next();
});

export default router;
