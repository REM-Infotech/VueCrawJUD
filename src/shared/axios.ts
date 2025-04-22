import { router } from "@/renderer/router";
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
    if (isAxiosError(error)) {
      if ("response" in error && error.response?.status === 401) {
        router.push({ name: "login" });
      } else if (error?.code === "ERR_NETWORK") {
        router.push({ name: "login" });
      }
    }
    return Promise.reject(error);
  },
);
