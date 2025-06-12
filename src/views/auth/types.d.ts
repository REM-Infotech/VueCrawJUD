import type { AxiosError, AxiosResponse } from "axios";

export interface AxiosResponseError extends AxiosError {
  response?: AxiosError["response"] & {
    data: {
      message: string;
    };
  };
}

export interface ResponseApi extends AxiosResponse {
  data: {
    token?: string;
  };
}
