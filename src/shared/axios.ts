import { router } from "@/renderer/router";

import axios, { isAxiosError } from "axios";
import type { ResponseError } from "ResponseError";
import { clearStores } from ".";
const url_api = "http://localhost:5000";
export const api = axios.create({
  baseURL: url_api,
  withCredentials: true,
  withXSRFToken: true,
});
api.interceptors.response.use(
  (response) => response,
  async (error: ResponseError) => {
    if (isAxiosError(error)) {
      if ("response" in error && error.response?.status === 401) {
        await clearStores();
        router.push({ name: "login" });
      } else if (error?.code === "ERR_NETWORK") {
        await clearStores();
        router.push({ name: "login" });
      }
    }
    return Promise.reject(error);
  },
);
