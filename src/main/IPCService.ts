import { app, BrowserWindow, ipcMain, IpcMainEvent } from "electron";
import path from "path";
import MainApp from "./MainApp";

ipcMain.on("on-app-maximize", (event: IpcMainEvent, args?: any) => {
  if (MainApp.mainWindow == null) return;

  if (MainApp.mainWindow.isMaximized()) {
    MainApp.mainWindow.unmaximize();
  } else {
    MainApp.mainWindow.maximize();
  }
});

ipcMain.on("on-open-game", (event: IpcMainEvent, args?: any) => {
  console.log(args);
  const child = new BrowserWindow({
    parent: MainApp.mainWindow,
    width: 960,
    height: 640,
    useContentSize: true,
    modal: false, 
    frame: true,
    resizable: true,
    show: false
  });
  var filePath: string = path.join(app.getPath("userData"), "games", args.md5, "index.html");
  child.loadURL(`file://${filePath}`);
  child.once('ready-to-show', () => {
    child.show()
  })
});
