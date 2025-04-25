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

interface TLog {
  message: string;
  color: string;
  id: string;
}

export type { TDataLog, TLog };
