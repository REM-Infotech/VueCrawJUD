import { api } from "@/main";
import type { LoginForm } from "@/types/forms";

export async function handleAuthentication(form: LoginForm) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await api.AxiosApi.post("/login", form);
  } catch (err) {
    console.log(err);
  }

  return true;
}
