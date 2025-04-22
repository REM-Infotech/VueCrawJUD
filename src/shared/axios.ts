import { router } from "@/renderer/router";
import { $ } from "@shared/index";
import axios, { isAxiosError } from "axios";
import type { ResponseError } from "ResponseError";

const url_api = "http://localhost:5000";
export const api = axios.create({
  baseURL: url_api,
  withCredentials: true,
  withXSRFToken: true,
});
api.interceptors.response.use(
  (response) => response,
  (error: ResponseError) => {
    if (isAxiosError(error)) {
      if ("response" in error && error.response?.status === 401) {
        $("#message").text("Sessão expirada, faça login novamente");
        // const { show: show_message } = useModal("ModalMessage");
        // setTimeout(show_message, 1000);

        router.push({ name: "login" });
        // ou exibir uma modal de sessão expirada
      } else if (error?.code === "ERR_NETWORK") {
        $("#message").text("Erro de conexão com o servidor");

        router.push({ name: "login" });
      }
    }
    return Promise.reject(error);
  },
);
