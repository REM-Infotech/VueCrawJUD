import { useModal } from "bootstrap-vue-next";
import jQuery from "jquery";
import { Router } from "vue-router";
import { api } from "../main";
const $ = jQuery;

export default function () {
  const { show: show_message } = useModal("ModalMessage");

  async function logout(router: Router) {
    api.post("/logout").then(() => {
      router.push({ name: "login" });
      $("#message").text("Logout Efetuado com sucesso!");
      show_message();
      sessionStorage.clear();
      localStorage.clear();
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
          sessionStorage.setItem("x-csrf-token", data["x-csrf-token"]);
          localStorage.setItem("admin", data.admin);
          // console.log(data["x-csrf-token"]);

          sessionStorage.setItem("message", "Login Efetuado com sucesso!");

          router.push({ name: "index" });
        } else if (response.data.message === "Usuário ou senha incorretos!") {
          $("#message").text("Usuário ou senha incorretos!");
          setTimeout(() => {
            show_message();
          }, 200);
        }
      })
      .catch(() => {
        //
      });
  }

  return { logout, authenticate };
}
