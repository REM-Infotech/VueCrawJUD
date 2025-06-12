import { api, appCookies } from "@/main";
import type { LoginForm } from "@/types/forms";
import { isAxiosError } from "axios";
import type { AxiosResponseError, ResponseApi } from "./types";

export async function handleAuthentication(form: LoginForm) {
  try {
    const result: ResponseApi = await api.request("post", "/login", form);

    if (result.data) {
      const data = result.data;

      appCookies.insertKey("access_token", data?.access?.token as string, {
        expires: Date.parse(data?.access?.expiration as string),
        secure: true,
        sameSite: "Strict",
        // HttpOnly: true,
      });

      appCookies.insertKey("refresh_token", data?.refresh?.token as string, {
        expires: Date.parse(data?.refresh?.expiration as string),
        secure: true,
        sameSite: "Strict",
        // HttpOnly: true,
      });

      appCookies.insertKey("isAdmin", data?.isAdmin?.toString() as string, {
        expires: Date.parse(data?.refresh?.expiration as string),
        secure: true,
        sameSite: "Strict",
        // HttpOnly: true,
      });
    }
  } catch (err) {
    if (isAxiosError(err)) {
      const error: AxiosResponseError = err;
      if (error.response?.data?.message) {
        const message: string = error.response.data.message;

        return message;
      }
    }
    console.log(err);
  }

  if (import.meta.env.VITE_DEVMODE) {
    return true;
  }
  return true;
}
