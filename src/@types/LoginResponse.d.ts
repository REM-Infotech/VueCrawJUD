interface LoginResponse {

  status: number;
  data: {
    token: string;
    message: string;
    "x-csrf-token": string;
    admin: boolean;
  }

}

export type { LoginResponse };
