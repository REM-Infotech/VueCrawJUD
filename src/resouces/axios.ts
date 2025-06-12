import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";

type AxiosRequests = "get" | "post";

class AxiosCrawJUD {
  AxiosApi: AxiosInstance;
  axios_config: AxiosRequestConfig<unknown> = { baseURL: "/" };
  constructor(axios_config: AxiosRequestConfig<unknown> = { baseURL: "/" }) {
    this.axios_config = axios_config;

    this.AxiosApi = axios.create(axios_config);
    axios["get"]("/login");
  }

  async request(
    method: AxiosRequests,
    url: string,
    data?: unknown,
    config: AxiosRequestConfig = {},
  ) {
    if (data) {
      return await this.AxiosApi[method](url, data, config);
    }

    return await this.AxiosApi[method](url, config);
  }
}

export default AxiosCrawJUD;
