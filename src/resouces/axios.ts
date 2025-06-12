import { appCookies } from "@/main";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";

class AxiosCrawJUD {
  AxiosApi: AxiosInstance;
  private tokenApi: string = "";

  constructor(axios_config: AxiosRequestConfig<unknown> = { url: "/" }) {
    this.AxiosApi = axios.create(axios_config);
  }

  handleChangeToken(token_api: string) {
    appCookies.insertKey("token", token_api, { secure: true, sameSite: "Lax" });
  }
}

export default AxiosCrawJUD;
