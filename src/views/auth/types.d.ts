import type { AxiosError, AxiosResponse } from "axios";

export interface AxiosResponseError extends AxiosError {
  response?: AxiosError["response"] & {
    data: {
      message: string;
    };
  };
}

export interface ResponseApi extends AxiosResponse {
  data?: {
    access?: { token?: string; expiration?: string };
    refresh?: { token?: string; expiration?: string };
    timezone?: string;
    isAdmin?: boolean;
  };
}
