import type { TSelectInput } from "./FormSelectInput";

interface TCurrentBot {
  id: number;
  system: string;
  state?: string;
  client?: string;
  type?: string;
  display_name?: string;
  form_cfg?: string;
}

interface TSelectInput {
  value?: string | null;
  text: string;
  disabled?: boolean;
}

interface TUploadableFile {
  file: File;
  name: string;
  id?: unknown;
  url?: string;
  status?: string | null;
  type?: string;
}

interface TFormBot {
  system: string;
  state_client: {
    selected: string | null;
    items: TSelectInput[];
  };
  credentials: {
    selected: string | null;
    items: TSelectInput[];
  };
  type: string;
  files: TUploadableFile[];
  need_files: boolean;
  need_options: boolean;
  bot_protocolo: boolean;
  state_client_type: string;
}

export type { TCurrentBot, TFormBot, TSelectInput, TUploadableFile };
