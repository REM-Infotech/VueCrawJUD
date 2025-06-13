import { api } from "@/main";
import type { LoginForm } from "@/types/forms";
import { isAxiosError } from "axios";
import type { AxiosResponseError, ResponseApi } from "./types";

export async function handleAuthentication(form: LoginForm) {
  try {
    const result: ResponseApi = await api.request({
      method: "POST",
      url: "/auth/login",
      data: form,
    });

    if (result.data) {
      return true;
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
