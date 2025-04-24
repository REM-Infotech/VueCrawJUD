import { ipcMain, safeStorage } from "electron";
import Store from "electron-store";

const store = new Store<Record<string, string>>({
  name: "ray-encrypted",
  watch: true,
  encryptionKey: "this_only_obfuscates",
});

ipcMain.handle("SaveCredentials", async (_, key: string, password: string) => {
  const buffer = safeStorage.encryptString(password);
  store.delete(key);

  if (Object.entries(store.store).length > 1) {
    store.clear();
  }

  store.set(key, buffer.toString("latin1"));
});

ipcMain.handle("RemoveCredentials", async (_, key: string) => {
  store.delete(key);
  if (Object.entries(store.store).length > 1) {
    store.clear();
  }
});

ipcMain.handle(
  "getCredentials",
  async (): Promise<Array<{ account: string; password: string }>> => {
    return Object.entries(store.store).reduce(
      (credentials, [account, buffer]) => {
        return [
          ...credentials,
          { account, password: safeStorage.decryptString(Buffer.from(buffer, "latin1")) },
        ];
      },
      [] as Array<{ account: string; password: string }>,
    );
  },
);
ipcMain.handle(
  "getAllCredentials",
  async (): Promise<Array<{ account: string; password: string }>> => {
    return Object.entries(store.store).map(([account, password]) => ({ account, password }));
  },
);
