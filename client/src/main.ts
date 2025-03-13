import "./assets/main.css";
import "./assets/sb.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./assets/styles.css";
import "jquery/dist/jquery.min.js";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import "../plugins/axios.ts";
function CreateApp() {
  const app = createApp(App);

  app.use(router);

  app.mount("#app");
}
CreateApp();
