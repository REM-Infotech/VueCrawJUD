import { router } from "@/renderer/router";
import { tokenStore } from "@store/tokenAuthStore";
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
  async (error: ResponseError) => {
    const authStore = tokenStore();
    if (isAxiosError(error)) {
      if ("response" in error && error.response?.status === 401) {
        const creds = await window.electronAPI.getAllCredentials();

        if (creds.length > 0) {
          const { account } = creds[0];
          await window.electronAPI.RemoveCredentials(account);
        }
        authStore.clear();
        router.push({ name: "login" });
      } else if (error?.code === "ERR_NETWORK") {
        const creds = await window.electronAPI.getAllCredentials();

        if (creds.length > 0) {
          const { account } = creds[0];
          await window.electronAPI.RemoveCredentials(account);
        }
        authStore.clear();
        router.push({ name: "login" });
      }
    }
    return Promise.reject(error);
  },
);
