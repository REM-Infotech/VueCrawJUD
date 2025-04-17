import type { LoadWindow, TtitleBarStyle } from "@/types/service";
import type { BrowserWindow } from "electron";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

export const modeLoadWindow: LoadWindow = {
  "true":
    async (mainWindow: BrowserWindow) => {
      mainWindow.webContents.openDevTools();
      await mainWindow.loadURL("http://localhost:3000");
    },
  "false":
    async (mainWindow: BrowserWindow) => {
      await mainWindow.loadFile(join(__dirname, "./renderer/crawjud_renderer/index.html"));
    },
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const titleBarStyle: TtitleBarStyle = () => {

  // if (isDev) {
  //   return "default";
  // }
  return "hidden";

}
