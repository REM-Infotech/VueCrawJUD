
import type { ResponseApi, ResponseGoogleStorage } from "ResponseFile";
import axios from "axios";
import { dialog, ipcMain, nativeTheme, Notification } from "electron";

import fs from "fs/promises";
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

ipcMain.on("file_save", async (_, file: string, csrf_token: string, api_key: string) => {

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

  try {
    const url_api = "http://localhost:5000";
    const api = axios.create({
      baseURL: url_api,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-csrf-token": csrf_token,
        Authorization: `Bearer ${api_key}`,
      },
      withCredentials: true,
      withXSRFToken: true,
    });
    response1 = await api.get(`/executions/download/${file}`)
    const data = response1.data;
    const url: string = data.url;

    response2 = await axios.get(url)


    const path = await dialog.showSaveDialog(mainWindow, {
      title: "Salvar arquivo de execução",
      defaultPath: file,
      filters: [
        { name: "Arquivo Zip", extensions: ["zip"] },
      ]
    })

    const fileBlob = new Blob([response2.data.file], { type: "application/octet-stream" });

    const buffer = Buffer.from(await fileBlob.arrayBuffer());

    await fs.writeFile(path.filePath, buffer);

    const notify = new Notification({
      title: "Sucesso!",
      body: "Arquivo salvo com sucesso em " + path.filePath,
      icon: icon,
      actions: [{
        text: "Abrir pasta",
        type: "button",
      }]
    });
    notify.show();

  } catch (error) {
    console.log(error)
    //
  }


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
