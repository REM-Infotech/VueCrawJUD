import "@assets/css/main.css";
import "@assets/css/styles.css";
import "@plugins/axios";
import { $ } from "@plugins/globals";
import "@popperjs/core";
import { createBootstrap, useModal } from "bootstrap-vue-next";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "datatables.net-select";
import "jquery/dist/jquery.min.js";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

function CreateApp() {
  const pinia = createPinia()
  const app = createApp(App);

  app.use(createBootstrap()); // Important
  app.use(router);
  app.use(pinia)
  app.mount("#app");

}
CreateApp();


router.afterEach((to) => {
  if ($("#message").text() !== "" && to.name === "login") {
    const { show: show_message } = useModal("ModalMessage");
    setTimeout(show_message, 500);
  }
});
