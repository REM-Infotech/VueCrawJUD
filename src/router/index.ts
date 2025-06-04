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
    },
    {
      path: "/robots",
      name: "robots",
      component: () => import("@/views/robots/RobotsView.vue"),
    },
    {
      path: "/executions",
      name: "executions",
      component: () => import("@/views/EmptyView.vue"),
    },
    {
      path: "/scheduled",
      name: "scheduled",
      component: () => import("@/views/EmptyView.vue"),
    },
  ],
});

export default router;
