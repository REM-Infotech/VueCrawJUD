import { createRouter, createWebHistory } from "vue-router";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuth = !!localStorage.getItem("token");
  if (to.meta.requiresAuth && !isAuth) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
