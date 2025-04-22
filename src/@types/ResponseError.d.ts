import type { AxiosError } from "axios";

interface ResponseError extends AxiosError {
  response?: {
    data: {
      message: string;
      error?: string;
    };
    status: number;
  };
}
