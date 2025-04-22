import { ipcMain, nativeTheme } from "electron";

ipcMain.on("minimize", async () => {

  const { mainWindow } = await import("../main/main");
  mainWindow.minimize();
});

ipcMain.on("maximize", async () => {
  const { mainWindow } = await import("../main/main");
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.on("close", async () => {
  const { mainWindow } = await import("../main/main");
  mainWindow.close();
});

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
