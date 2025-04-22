interface ResponseApi {

  status: number;
  data: {
    url: string;
  }

}

interface ResponseGoogleStorage {

  status: number;
  data: {
    file: File
  }

}

export type { ResponseApi, ResponseGoogleStorage };
