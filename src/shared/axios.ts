import { router } from "@/renderer/router";

import axios, { isAxiosError } from "axios";
import type { ResponseError } from "ResponseError";
import { clearStores } from ".";

const url_api = "https://api.reminfotech.net.br";

export const api = axios.create({
  baseURL: url_api,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.response.use(
  (response) => response,
  async (error: ResponseError) => {
    console.log(error);
    if (isAxiosError(error)) {
      if ("response" in error && error.response?.status === 401) {
        router.push({ name: "login" });
      } else if (error?.code === "ERR_NETWORK") {
        await clearStores();
        router.push({ name: "login" });
      }
    }
    return Promise.reject(error);
  },
);
