import { useModal } from "bootstrap-vue-next";
import { Router } from "vue-router";
import { api } from "../main";
// import jQuery from "jquery";
// const $ = jQuery;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { show } = useModal("ModalMessage");

export default function () {
  async function logout(router: Router) {
    try {
      const refreshToken = sessionStorage.getItem("token");

      sessionStorage.setItem("message", "Logout Efetuado com sucesso!");

      if (refreshToken) {
        const response = await api.post("/logout");

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

  async function authenticate(router: Router) {
    try {
      const response = await api.post("/auth", {
        login: $("#login").val(),
        password: $("#password").val(),
        remember_me: $("#gridCheck").is(":checked"),
      });

      if (response.status === 200) {
        const data: Record<string, string> = response.data as Record<string, string>;
        sessionStorage.setItem("token", data.token);

        sessionStorage.setItem("message", "Login Efetuado com sucesso!");

        router.push({ name: "index" });
      }
    } catch (error) {
      console.log(error);
      router.push({ name: "index" });
    }
  }

  return { logout, authenticate };
}
