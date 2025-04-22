import { dialog, ipcMain } from "electron";
import { join } from "path";
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

  const mensagem_sair = await dialog.showMessageBox(mainWindow, {
    type: "question",
    message: "Deseja realmente sair?",
    buttons: ["Sim", "Não"],
    defaultId: 1,
    cancelId: 1,
    title: "Sair",
    noLink: true,
    icon: join(process.cwd(), "src", "renderer", "assets", "img", "icon.png"),
  });

  if (mensagem_sair.response === 0) {
    mainWindow.close();
  }
});
