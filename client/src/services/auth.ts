import { useModal } from "bootstrap-vue-next";
import jQuery from "jquery";
import { Router } from "vue-router";
import { api } from "../main";
const $ = jQuery;

export default function () {
  const { show } = useModal("ModalMessage");

  async function logout(router: Router) {
    api
      .post("/logout")
      .then((response) => {
        if (response.status === 200 || response.status === 401) {
          sessionStorage.removeItem("token");
          router.push({ name: "login" });
        }

        sessionStorage.removeItem("token");
        router.push({ name: "login" });

        $("#message").text("Logout Efetuado com sucesso!");
        show();
      })
      .catch((response) => {
        if (response.status === 200 || response.status === 401) {
          sessionStorage.removeItem("token");
          router.push({ name: "login" });
        }

        $("#message").text(response.data.message);
        show();

        sessionStorage.removeItem("token");
        router.push({ name: "login" });
      });
  }

  async function authenticate(router: Router) {
    const login = $("#login").val();
    const password = $("#password").val();

    api
      .post(
        "/login",
        {
          login: login,
          password: password,
          remember_me: $("#gridCheck").is(":checked"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          withXSRFToken: true,
          xsrfCookieName: "access_token_cookie",
        },
      )
      .then((response) => {
        if (response.status === 200) {
          const data: Record<string, string> = response.data as Record<string, string>;
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("x-csrf-token", data["access_csrf"]);

          console.log(data["access_csrf"]);

          sessionStorage.setItem("message", "Login Efetuado com sucesso!");

          router.push({ name: "index" });
        }
      })
      .catch((error) => {
        $("#message").text(error.data.message);
        show();
      });
  }

  return { logout, authenticate };
}
