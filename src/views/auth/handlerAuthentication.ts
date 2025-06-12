import { api } from "@/main";
import type { LoginForm } from "@/types/forms";
import { AxiosError, isAxiosError } from "axios";

interface AxiosResponseError extends AxiosError {
  response?: AxiosError["response"] & {
    data?: {
      message: string;
    };
  };
}

export async function handleAuthentication(form: LoginForm) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await api.request("post", "/login", form);
  } catch (err) {
    if (isAxiosError(err)) {
      const error: AxiosResponseError = err;
      if (error.response?.data?.message) {
        const message: string = error.response.data.message;

        return message;
      }

      console.log(err);
    }
  }

  if (import.meta.env.VITE_DEVMODE) {
    return true;
  }
  return true;
}
