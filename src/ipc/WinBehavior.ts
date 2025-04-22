import { ipcMain } from "electron";
import { MainWindow } from ".";

ipcMain.on("minimize", async () => {

  const mainWindow = await MainWindow();
  mainWindow.minimize();
});

ipcMain.on("maximize", async () => {
  const mainWindow = await MainWindow();
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.on("close", async () => {
  const mainWindow = await MainWindow();
  mainWindow.close();
});
