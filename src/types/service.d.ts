/// <reference types="vite/client" />
export type TtitleBarStyle = () => "hidden" | "default"

export interface LoadWindow {
  "true": (mainWindow: BrowserWindow) => Promise<void>;
  "false": (mainWindow: BrowserWindow) => Promise<void>;
}


interface ProcessEnv {

  readonly DATABASE_CONNECTOR: string
  readonly DATABASE_USER: string
  readonly DATABASE_PASSWORD: string
  readonly DATABASE_HOST: string
  readonly DATABASE_PORT: string
  readonly DATABASE_SCHEMA: string

}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
