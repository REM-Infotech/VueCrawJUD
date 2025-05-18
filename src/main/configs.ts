import { app } from "electron";
import isDev from "electron-is-dev";
import { join } from "path";

export let icon: string;

if (!isDev) {
  icon =
    process.platform === "win32"
      ? join(__dirname, "../assets", "brand", "icon.ico")
      : join(__dirname, "../assets", "brand", "icon.png");
} else if (isDev) {
  icon =
    process.platform === "win32"
      ? join(app.getAppPath(), "src", "assets", "brand", "icon.ico")
      : join(app.getAppPath(), "src", "assets", "brand", "icon.png");
}
