import type { AxiosResponse } from "axios";
import type { TSelectInput } from "./FormSelectInput";

interface TResponseData {
  access: {
    token: string;
    expiration: string;
  };
  refresh: {
    token: string;
    expiration: string;
  };
  timezone: string;

  message?: string;
}

interface TResponseLogin extends AxiosResponse {
  status: number;
  data: TResponseData;
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

interface TLogsApiResponse extends AxiosResponse {
  status: number;
  data: {
    document_url: string;
  };
}

export type {
  ResponseApi,
  ResponseGoogleStorage,
  TLogsApiResponse,
  TResponseData,
  TResponseInfoBot,
  TResponseLogin,
};
