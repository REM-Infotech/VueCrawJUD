/* import()*/
import { initialize } from "@electron/remote/main/index";
import { app, BrowserWindow, ipcMain, nativeTheme, screen, Tray } from "electron";
import isDev from "electron-is-dev";

import { Buffer } from "buffer";
import { spawn } from "child_process";
import fs from "fs/promises";
import { tmpdir } from "os";
import process from "process";

import { dirname, join } from "path";
import { fileURLToPath } from "url";

const options =

  (opt: string, formdata: formType, filepath: string): Array<string> => {

    const opts: Record<string, Array<string>> = {
      InformaSentencas: [
        "/c", "py", "-3.13", "-m",
        "interface_robo",
        "--bot",
        "InformaSentencas",
        "--username",
        formdata.username,
        "--password",
        formdata.password,
        "--xlsx",
        filepath,
      ],
      ExtractIntimacoes: [
        "/c", "py", "-3.13", "-m",
        "interface_robo",
        "--bot",
        "ExtractIntimacoes",
        "--pastas",
        formdata.pastas,
        "--email",
        formdata.email,
      ],
      AnaliseApagao: [
        "/c", "py", "-3.13", "-m",
        "interface_robo",
        "--bot",
        "AnaliseApagao",
        "--api_key",
        formdata.api_key,
        "--xlsx",
        filepath,
      ],
    };

    let options_exec = opts[opt];
    if (isDev) {
      options_exec = ["/c", "poetry", "run", ...options_exec.slice(4)];
    }

    return options_exec;
  };

const modeLoadWindow = {
  "true":
    async (mainWindow: BrowserWindow) => {
      mainWindow.webContents.openDevTools();

      await mainWindow.loadURL("http://localhost:3000");
    },
  "false":
    async (mainWindow: BrowserWindow) => {
      await mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
    },
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createWindow = async () => {
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

  const mainWindow = new BrowserWindow({
    icon: join(process.cwd(), "client ", "src", "assets", "img", "icon.ico"),
    minWidth: minWidth,
    minHeight: minHeight,
    width: minWidth,
    height: minHeight,
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      sandbox: !isDev,
      preload: join(__dirname, "preload.js"),
    },
  });
  ipcMain.on("minimize", () => {
    mainWindow.minimize();
  });

  ipcMain.on("maximize", () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });

  ipcMain.on("close", () => {
    mainWindow.close();
  });

  ipcMain.on(
    "peform",
    async (_: import("electron").IpcMainEvent, formdata: formType) => {
      const filename = formdata.xlsx.filename;
      const filebuffer = Buffer.from(formdata.xlsx?.arrayFile);
      const filepath = join(tmpdir(), filename);

      fs.writeFile(filepath, filebuffer).catch(() => {
        throw new Error("Error writing file");
      });

      const options_start = options(formdata.bot, formdata, filepath);
      const child = spawn("cmd.exe", options_start, {
        detached: true,
        stdio: "ignore",
      });
      child.unref();
    },
  );

  ipcMain.handle("dark-mode:toggle", () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = "light";
    } else {
      nativeTheme.themeSource = "dark";
    }
    return nativeTheme.shouldUseDarkColors;
  });

  ipcMain.handle("dark-mode:system", () => {
    nativeTheme.themeSource = "system";
  });

  await modeLoadWindow[isDev ? "true" : "false"](mainWindow);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const traywindow = new Tray(join(process.cwd(), "src", "renderer", "assets", "img", "icon.png"));
};

initialize();
app.whenReady().then(createWindow);
