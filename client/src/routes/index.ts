import { createRouter, createWebHistory } from "vue-router";
import { api } from "../main";
import { useModal } from "bootstrap-vue-next";
import jQuery from "jquery";
import { routes } from "./route";
const $ = jQuery;

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { show, hide } = useModal("modal-load");

  const isAuth = !!sessionStorage.getItem("token");
  const response = await api.get("/");
  if (to.meta.requiresAuth) {
    if (!isAuth || response.status === 401) {
      if (!isAuth) {
        sessionStorage.setItem("message", "É necessário fazer login para acessar essa página!");
      } else if (response.status === 401) {
        sessionStorage.setItem("message", "Sessão expirada, faça login novamente!");
      }

      sessionStorage.removeItem("token");

      return next({ name: "login" });
    }
    show();
  }

  next();
});

// Global afterEach hook para gerenciar a classe do app
router.afterEach((to) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { show, hide } = useModal("modal-load");
  if (to.meta.requiresAuth) {
    if ($("#app").hasClass("bg-indigo")) {
      $("#app").removeClass("bg-indigo");
      $("#app").addClass("bg-purple");
    }
    setTimeout(() => {
      hide();
    }, 500);
  } else {
    if ($("#app").hasClass("bg-purple")) {
      $("#app").removeClass("bg-purple");
    }
    $("#app").addClass("bg-indigo");
  }
});

export default router;
