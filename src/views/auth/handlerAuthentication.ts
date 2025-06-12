import { api } from "@/main";
import type { LoginForm } from "@/types/forms";
import { isAxiosError } from "axios";
import type { AxiosResponseError, ResponseApi } from "./types";

export async function handleAuthentication(form: LoginForm) {
  try {
    const result: ResponseApi = await api.request("post", "/login", form);

    if (result.data?.token) {
      const data = result.data;
      console.log(data);
    }
  } catch (err) {
    if (isAxiosError(err)) {
      const error: AxiosResponseError = err;
      if (error.response?.data?.message) {
        const message: string = error.response.data.message;

        return message;
      }
    }
  }

  if (import.meta.env.VITE_DEVMODE) {
    return true;
  }
  return true;
}
