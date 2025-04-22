import type { AxiosResponse } from "axios";
import type { TSelectInput } from "./FormSelectInput";

interface TResponseLogin extends AxiosResponse {
  status: number;
  data: {
    token: string;
    "x-csrf-token": string;
    admin: boolean | string;
    message?: string;
  };
}

interface ResponseApi extends AxiosResponse {
  status: number;
  data: {
    url: string;
  };
}

interface TResponseInfoBot extends AxiosResponse {
  data?: {
    info?: TSelectInput[];
    type?: string;
  };
}

interface ResponseGoogleStorage extends AxiosResponse {
  status: number;
  data: ArrayBuffer;
  headers: {
    "Content-Type": string;
    "Content-Disposition": string;
    "Content-Length": string;
  };
}

export type { ResponseApi, ResponseGoogleStorage, TResponseInfoBot, TResponseLogin };
