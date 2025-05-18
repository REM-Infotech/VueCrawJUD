import isDev from "electron-is-dev";
import { app, BrowserWindow, session } from "electron";
import path, { join } from "path";
import { fileURLToPath } from "url";
import "./main/WinBehavior";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cwd = app.getAppPath();

/** @type {import("electron/main").BrowserWindow} */
export let mainWindow: BrowserWindow;

const icon =
  process.platform === "win32"
    ? join(__dirname, "../assets", "brand", "icon.ico")
    : join(__dirname, "../assets", "brand", "icon.png");

async function createWindow() {
  const preload_path = path.join(__dirname, "./preload.js");
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,

    webPreferences: {
      preload: preload_path,
      nodeIntegration: true,
    },

    icon: icon,
  });

  if (!isDev) {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  } else if (isDev) {
    mainWindow.loadURL("http://localhost:5173/");
  }
}

app.commandLine.appendSwitch("enable-transparent-visuals");
app.commandLine.appendSwitch("disable-gpu");
app.on("ready", () => {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [
          "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';",
        ],
      },
    });
  });
  setTimeout(() => {
    createWindow();
  }, 200);
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
