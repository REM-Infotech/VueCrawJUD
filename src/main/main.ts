import { modeLoadWindow, titleBarStyle } from "@/plugins/electron";
import "@/plugins/handlers";
import { initialize } from "@electron/remote/main/index";
import { app, BrowserWindow, screen, Tray } from "electron";
import isDev from "electron-is-dev";
import { join } from "path";
import process from "process";
import "./util";

export let traywindow: Tray;
export let mainWindow: BrowserWindow;

const createWindow = async () => {

  initialize();
  let minWidth = 800;
  let minHeight = 600;

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
  console.log(!isDev)
  mainWindow = new BrowserWindow({
    icon: join(process.cwd(), "src", "assets", "img", "icon.ico"),
    minWidth: minWidth,
    minHeight: minHeight,
    width: minWidth,
    height: minHeight,
    autoHideMenuBar: false,
    titleBarStyle: titleBarStyle(),
    webPreferences: {
      nodeIntegration: true,
      sandbox: !isDev,
      preload: join(__dirname, "preload.js"),
    },
  });

  await modeLoadWindow[isDev ? "true" : "false"](mainWindow);
  traywindow = new Tray(join(process.cwd(), "src", "assets", "img", "icon.ico"));
};


app.whenReady().then(createWindow);

