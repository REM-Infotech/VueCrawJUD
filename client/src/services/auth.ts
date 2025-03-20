import { useModal } from "bootstrap-vue-next";
import jQuery from "jquery";
import { Router } from "vue-router";
import { api } from "../main";
const $ = jQuery;
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
      const login = $("#login").val();
      const password = $("#password").val();

      const response = await api.post(
        "/login",
        {
          login: login,
          password: password,
          remember_me: $("#gridCheck").is(":checked"),
        },
        {
          headers: { "Content-Type": "application/json", Authorization: "" },
          withCredentials: true,
          withXSRFToken: true,
          xsrfCookieName: "access_token_cookie",
        },
      );

      if (response.status === 200) {
        const data: Record<string, string> = response.data as Record<string, string>;
        sessionStorage.setItem("token", data.token);

        sessionStorage.setItem("message", "Login Efetuado com sucesso!");

        router.push({ name: "index" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return { logout, authenticate };
}
