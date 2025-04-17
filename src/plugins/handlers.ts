import { Buffer } from "buffer";
import { spawn } from "child_process";
import { ipcMain, nativeTheme } from "electron";
import fs from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { mainWindow } from "../main/main";
import { options } from "../main/util";

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
