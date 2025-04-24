interface TDataLog {
  message: string;
  type: string;
  pid: string;
  typeLog: string;
  total: number;
  remaining: number;
  success: number;
  errors: number;
  status: string;
  executed: number;
}

export type { TDataLog };
