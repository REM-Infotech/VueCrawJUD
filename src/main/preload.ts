import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => ipcRenderer.send("minimize"),
  maximize: () => ipcRenderer.send("maximize"),
  close: () => ipcRenderer.send("close"),
  perform: (formdata: unknown) => ipcRenderer.send("peform", formdata),
  getAllCredentials: () => ipcRenderer.invoke("getAllCredentials"),
  getCredentials: () => ipcRenderer.invoke("getCredentials"),
  file_save: (
    file: string,
    csrf: string,
    api_token: string,
  ): Promise<Array<{ account: string; password: string }>> =>
    ipcRenderer.invoke("file_save", file, csrf, api_token),
  SaveCredentials: (username: string, password: string): Promise<void> =>
    ipcRenderer.invoke("SaveCredentials", username, password),

  RemoveCredentials: (key: string): Promise<void> => ipcRenderer.invoke("RemoveCredentials", key),
  AlertError: () => ipcRenderer.invoke("AlertError"),
});

contextBridge.exposeInMainWorld("darkMode", {
  toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
  system: () => ipcRenderer.invoke("dark-mode:system"),
});
