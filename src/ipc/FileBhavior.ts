import type { ResponseApi, ResponseGoogleStorage } from "ResponsesAPI";
import axios from "axios";
import { dialog, ipcMain } from "electron";
import fs from "fs/promises";
import { MainWindow } from ".";

ipcMain.on("file_save", async (_, file: string, csrf_token: string, api_key: string) => {
  const { NotificationSuccess } = await import("@/main/components");
  const mainWindow = await MainWindow();
  let response1: ResponseApi;
  let response2: ResponseGoogleStorage;

  const api = axios.create({
    baseURL: "https://api.reminfotech.net.br",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${api_key}`,
    },
  });

  try {
    response1 = await api.get(`/executions/download/${file}`, {
      headers: {
        Authorization: `Bearer ${api_key}`,
      },
    });
    const data = response1.data;
    const url: string = data.url;

    response2 = await api.get(url, { responseType: "arraybuffer" });

    const path = await dialog.showSaveDialog(mainWindow, {
      title: "Salvar arquivo de execução",
      defaultPath: file,
      filters: [{ name: "Arquivo Zip", extensions: ["zip"] }],
    });

    const buffer = Buffer.from(response2.data);

    await fs.writeFile(path.filePath, buffer);
    NotificationSuccess.body = "Arquivo salvo com sucesso em " + path.filePath;
    NotificationSuccess.show();
  } catch {
    //
  }
});
