import { api } from "../../main";
import { Router } from "vue-router";
// import jQuery from "jquery";
// const $ = jQuery;

export async function logout(router: Router) {
  try {
    const refreshToken = sessionStorage.getItem("token");

    sessionStorage.setItem("message", "Logout Efetuado com sucesso!");

    if (refreshToken) {
      const response = await api.post("/logout", {}, { withCredentials: true });

      if (response.status === 200 || response.status === 401) {
        sessionStorage.removeItem("token");
        router.push({ name: "login" });
      }

      sessionStorage.removeItem("token");
      router.push({ name: "login" });
    }
  } catch (error) {
    console.log(error);
    sessionStorage.removeItem("token");
    router.push({ name: "login" });
  }
}
