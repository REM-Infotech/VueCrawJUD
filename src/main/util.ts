import { app } from "electron";

import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const __parent = resolve(__dirname, "..");
import { URL } from "url";
import path from "path";

export function resolveHtmlPath(htmlFileName: string) {

  if (process.env.NODE_ENV === "development") {

    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, "../renderer/", htmlFileName)}`;
}

export const RESOURCES_PATH = app.isPackaged
  ?
  path.join(process.resourcesPath, "assets")
  : path.join(__dirname, "../assets");

export const getAssetPath = (...paths: string[]) => {
  return path.join(RESOURCES_PATH, ...paths);
};
