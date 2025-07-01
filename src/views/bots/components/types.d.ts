import type { AxiosResponse } from "axios";

interface Employee {
  Name?: string;
  Position?: string;
  Office?: string;
  Age?: string;
  "Start date"?: string;
  Salary?: string;
}

interface BotInfo {
  [key: string]: string;
  id: number;
  display_name: string;
  system: string;
  state: string;
  client: string;
  type: string;
  form_cfg: string;
  classification: string;
  text: string;
}

interface ResponseConfigForm extends AxiosResponse {
  data?: {
    config?: string[];
  };
}

export type { BotInfo, Employee, ResponseConfigForm };
