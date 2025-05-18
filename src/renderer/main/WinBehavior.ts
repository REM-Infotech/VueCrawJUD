import { app, ipcMain } from "electron";

/** @type {Promise<import("electron/main").BrowserWindow>} */
const GetmainWindow = async () => {
  const { mainWindow } = await import("../main");
  return mainWindow;
};

ipcMain.on("minimize", async () => {
  /** @type {import("electron/main").BrowserWindow} */
  const mainWindow = await GetmainWindow();
  mainWindow.minimize();
});

ipcMain.on("maximize", async () => {
  /** @type {import("electron/main").BrowserWindow} */
  const mainWindow = await GetmainWindow();
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.on("close", async () => {
  /** @type {import("electron/main").BrowserWindow} */
  app.quit();
});
