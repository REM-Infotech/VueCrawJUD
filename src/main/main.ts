import "@/ipc/CredentialsBehavior";
import "@/ipc/FileBhavior";
import "@/ipc/ThemeBehavior";
import "@/ipc/WinBehavior";
import { modeLoadWindow, titleBarStyle } from "@/shared/ElectronConfig";
import { initialize } from "@electron/remote/main/index";
import { app, BrowserWindow, screen, Tray } from "electron";
import isDev from "electron-is-dev";
import { join } from "path";
import { icon } from "./configs";

export let traywindow: Tray;
export let mainWindow: BrowserWindow;

let minWidth = 800;
let minHeight = 600;

app.setAppUserModelId("com.app.RemDevs.CrawJUD");

const createWindow = async () => {
  initialize();
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const configs = [
    { check: (w: number, h: number) => w <= 800 && h <= 600, minWidth: 640, minHeight: 480 },
    { check: (w: number, h: number) => w === 1366 && h <= 768, minWidth: 1024, minHeight: 720 },
    { check: (w: number, h: number) => w === 1920 && h <= 1080, minWidth: 1280, minHeight: 720 },
  ];

  for (const config of configs) {
    if (config.check(width, height)) {
      minWidth = config.minWidth;
      minHeight = config.minHeight;
      break;
    }
  }
  mainWindow = new BrowserWindow({
    icon: icon,
    minWidth: minWidth,
    minHeight: minHeight,
    width: minWidth,
    height: minHeight,
    titleBarStyle: titleBarStyle(),
    webPreferences: {
      preload: join(__dirname, "./preload.js"),
    },
  });

  await modeLoadWindow[isDev ? "true" : "false"](mainWindow);
  await import("./components");
};

app.whenReady().then(createWindow);

app.on("window-all-closed", async () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
