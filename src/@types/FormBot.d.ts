import type { StoreCredentials } from "./FormCredentials";
import type { StoreStateClient } from "./FormStateClient";

interface TUploadableFile {
  file?: File;
  name?: string;
  id?: unknown;
  url?: string;
  status?: string | null;
  type?: string;
}

interface TFormBot {
  system: string;
  state_client?: StoreStateClient[];
  credentials?: StoreCredentials[];
  type: string;
  files: TUploadableFile[];
}

export type { TFormBot, TUploadableFile };
