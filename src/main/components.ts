import { MainWindow } from "@/ipc";
import { app, dialog, Menu, Notification, Tray } from "electron";
import { join } from "path";
import { icon } from "./configs";

export const NotificationSuccess = new Notification({
  title: "Sucesso!",
  icon: icon,
});

export const IconTray = new Tray(icon);

const MenuApp = Menu.buildFromTemplate([
  {
    label: "Sair",
    async click() {
      const mainWindow = await MainWindow();
      const mensagem_sair = await dialog.showMessageBox(mainWindow, {
        type: "question",
        message: "Deseja realmente sair?",
        buttons: ["Sim", "Não"],
        defaultId: 1,
        cancelId: 1,
        title: "Sair",
        noLink: true,
        icon: join(process.cwd(), "src", "renderer", "assets", "img", "icon.png"),
      });

      if (mensagem_sair.response === 0) {
        app.quit();
      }
    },
  },
]);
IconTray.setContextMenu(MenuApp);
