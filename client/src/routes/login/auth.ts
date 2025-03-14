import { api } from "../../main";
import jQuery from "jquery";
import { Router } from "vue-router";
const $ = jQuery;

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

export async function authenticate(router: Router) {
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
      if ($("#app").hasClass("bg-indigo")) {
        $("#app").removeClass("bg-indigo");
        $("#app").addClass("bg-purple");
      }
    }
  } catch (error) {
    console.error("Login failed:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    console.error(error);
    // Handle specific error cases
    if (error.code === "ERR_NETWORK") {
      alert("Cannot connect to server. Please check if the backend is running.");
    }
  }
}
