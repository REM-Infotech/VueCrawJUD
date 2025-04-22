/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ResponseApi, ResponseGoogleStorage } from "ResponseFile";
import { ipcMain, nativeTheme } from "electron";

const MainWindow = async () => {

  const { mainWindow } = await import("../main/main");
  return mainWindow;

}

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

ipcMain.on("filesave", async (_, file: string) => {

  let icon = ""
  try {
    const { join } = await import("path");
    icon = join(process.cwd(), "src", "renderer", "assets", "img", "icon.png")

  } catch {
    //
  }

  const mainWindow = await MainWindow();

  let response1: ResponseApi
  let response2: ResponseGoogleStorage

  // try {

  //   response1 = await api.get(`/executions/download/${file}`)
  //   const data = response1.data;
  //   const url: string = data.url;

  //   response2 = await axios.get(url)
  //   const fileBlob = new Blob([response2.data.file], { type: "application/octet-stream" });

  //   const path = await dialog.showSaveDialog(mainWindow, {
  //     title: "Salvar arquivo de execução",
  //     defaultPath: file,
  //     filters: [
  //       { name: "Arquivo Zip", extensions: ["zip"] },
  //     ]
  //   })
  //   console.log(path)

  //   const notify = new Notification({
  //     title: "Sucesso!",
  //     body: "Arquivo salvo com sucesso em " + path.filePath,
  //     icon: icon,
  //   });

  //   notify.show();

  // } catch {

  //   //
  // }


})

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
