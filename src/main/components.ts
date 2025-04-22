import { Notification, Tray } from "electron";
import { join } from "path";
const icon = join(process.cwd(), "src", "renderer", "assets", "img", "icon.png");


export const NotificationSuccess = new Notification({
  title: "Sucesso!",

});

export const IconTray = new Tray(icon);
