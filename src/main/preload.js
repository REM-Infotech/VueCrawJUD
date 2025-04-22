import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => ipcRenderer.send("minimize"),
  maximize: () => ipcRenderer.send("maximize"),
  close: () => ipcRenderer.send("close"),
  perform: (formdata) => ipcRenderer.send("peform", formdata),
  /**
   *
   * @param {string} file
   * @returns
   */
  file_save: (file, csrf, api_token) => ipcRenderer.send("file_save", file, csrf, api_token),
});

contextBridge.exposeInMainWorld("darkMode", {
  toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
  system: () => ipcRenderer.invoke("dark-mode:system"),
});
