import { app, Menu, Notification, Tray } from "electron";
import { join } from "path";
const icon = join(process.cwd(), "src", "renderer", "assets", "img", "icon.png");

export const NotificationSuccess = new Notification({
  title: "Sucesso!",
  icon: icon
});

export const IconTray = new Tray(icon);


const MenuApp = Menu.buildFromTemplate([
  {
    label: "Sair",
    click() {
      app.quit();
    }
  }
])
IconTray.setContextMenu(MenuApp)
