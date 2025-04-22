
import type { ResponseApi, ResponseGoogleStorage } from "ResponseFile";
import axios from "axios";
import { dialog, ipcMain } from "electron";
import fs from "fs/promises";
import { MainWindow } from ".";

ipcMain.on("file_save", async (_, file: string, csrf_token: string, api_key: string) => {

  const { NotificationSuccess } = await import("@/main/components");
  const mainWindow = await MainWindow();

  let response1: ResponseApi
  let response2: ResponseGoogleStorage

  const api = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-csrf-token": csrf_token,
      Authorization: `Bearer ${api_key}`,
    },
    withCredentials: true,
    withXSRFToken: true,
  });


  try {

    response1 = await api.get(`/executions/download/${file}`)
    const data = response1.data;
    const url: string = data.url;

    response2 = await api.get(url, { responseType: "arraybuffer" })

    const path = await dialog.showSaveDialog(mainWindow, {
      title: "Salvar arquivo de execução",
      defaultPath: file,
      filters: [
        { name: "Arquivo Zip", extensions: ["zip"] },
      ]
    })

    const buffer = Buffer.from(response2.data);

    await fs.writeFile(path.filePath, buffer);
    NotificationSuccess.body = "Arquivo salvo com sucesso em " + path.filePath
    NotificationSuccess.show();

  } catch {
    //
  }


})
