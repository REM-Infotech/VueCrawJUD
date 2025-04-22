import type { AxiosResponse } from "axios";

interface ResponseApi extends AxiosResponse {

  status: number;
  data: {
    url: string;
  }

}

interface ResponseGoogleStorage extends AxiosResponse {

  status: number;
  data: ArrayBuffer
  headers: {
    "Content-Type": string;
    "Content-Disposition": string;
    "Content-Length": string;
  }

}

export type { ResponseApi, ResponseGoogleStorage };
