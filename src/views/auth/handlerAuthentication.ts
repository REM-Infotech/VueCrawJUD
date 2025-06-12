import { api } from "@/main";
import type { LoginForm } from "@/types/forms";
import { isAxiosError } from "axios";

export async function handleAuthentication(form: LoginForm) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await api.request("post", "/login", form);
  } catch (err) {
    if (isAxiosError(err)) {
      console.log(err);
    }
  }

  if (import.meta.env.VITE_DEVMODE) {
    return true;
  }
  return true;
}
