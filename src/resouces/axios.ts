import { appCookies } from "@/main";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";

class AxiosCrawJUD {
  private api: AxiosInstance;
  private tokenApi: string = "";

  constructor(axios_config: AxiosRequestConfig<unknown>) {
    this.api = axios.create(axios_config);
  }

  async get(url: string) {
    return await this.api.get(url);
  }

  handleChangeToken(token_api: string) {
    appCookies.insertKey("token", token_api, { secure: true, sameSite: "Lax" });
  }
}

export default AxiosCrawJUD;
