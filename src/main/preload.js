import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => ipcRenderer.send("minimize"),
  maximize: () => ipcRenderer.send("maximize"),
  close: () => ipcRenderer.send("close"),
  perform: (formdata) => ipcRenderer.send("peform", formdata),
  getAllCredentials: () => ipcRenderer.invoke("getAllCredentials"),
  getCredentials: () => ipcRenderer.invoke("getCredentials"),
  /**
   * @param {string} file
   * @param {string} csrf
   * @param {string} api_token
   * @returns {Promise<Array<{ account: string; password: string }>>}
   */
  file_save: (file, csrf, api_token) => ipcRenderer.send("file_save", file, csrf, api_token),
  /**
   * @param {string} username
   * @param {string} password
   * @returns {Promise<void>}
   */
  SaveCredentials: (username, password) =>
    ipcRenderer.invoke("SaveCredentials", username, password),
  /**
   * @param {string} key
   * @returns {Promise<void>}
   */
  RemoveCredentials: (key) => ipcRenderer.invoke("RemoveCredentials", key),
  AlertError: () => ipcRenderer.invoke("AlertError"),
});

contextBridge.exposeInMainWorld("darkMode", {
  toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
  system: () => ipcRenderer.invoke("dark-mode:system"),
});
