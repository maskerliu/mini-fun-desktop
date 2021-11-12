import { app, App, BrowserWindow, Menu, nativeImage, shell, Tray } from "electron";
import path from "path";

export default class MainApp {
  static mainWindow: BrowserWindow = null;
  static app: App = app;

  static appTray: Tray = null;
  static winURL: string = process.env.NODE_ENV === "development" ? `http://localhost:9080` : `file://${__dirname}/index.html`;
  static trayFloder: string = process.env.NODE_ENV === "development" ? path.join(__dirname, "../../static") : path.join(__dirname, "./static");

  private static onWindowAllClosed() {
    if (process.platform.toString() !== "drawin") {
      MainApp.app.quit();
    }
  }

  private static onReady() {
    MainApp.createMainWindow();
    MainApp.createAppMenu();
    MainApp.createTrayMenu();
  }

  private static onClose() {
    MainApp.mainWindow = null;
  }

  private static createMainWindow() {
    let icon = nativeImage.createFromPath(path.join(MainApp.trayFloder, "icon_tray.png"));
    Menu.setApplicationMenu(null);

    if (MainApp.mainWindow != null) {
      MainApp.mainWindow.show();
      return;
    }

    MainApp.mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      minWidth: 960,
      minHeight: 640,
      useContentSize: true,
      transparent: false,
      frame: true,
      resizable: true,
      icon: icon,
      titleBarStyle: "hidden",
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: false,
        webSecurity: false,
        offscreen: false,
        enableRemoteModule: false,
      },
    });

    MainApp.mainWindow.loadURL(MainApp.winURL);
    MainApp.mainWindow.webContents.frameRate = 30;
    // mainWindow.webContents.openDevTools();
    MainApp.mainWindow.webContents.on("paint", (event, dirty, image) => { });

    MainApp.mainWindow.on("closed", () => {
      MainApp.onClose();
    });
  }

  private static createAppMenu() {
    Menu.setApplicationMenu(null)
  }

  private static createTrayMenu() {
    let trayMenuTemplate = [
      {
        label: "设置",
        click: () => { }, //打开相应页面
      },
      {
        label: "帮助",
        click: () => { },
      },
      {
        label: "关于",
        click: () => {
          shell.openExternal("https://github.com/maskerliu/app-mock-desktop");
        },
      },
      {
        label: "退出",
        click: () => {
          MainApp.app.quit();
          MainApp.app.quit();
        },
      },
    ];
    if (process.platform === "darwin") {
      MainApp.appTray = new Tray(path.join(MainApp.trayFloder, "icon_tray.png"));
    } else {
      MainApp.appTray = new Tray(path.join(MainApp.trayFloder, "icon.ico"));
    }
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
    MainApp.appTray.setToolTip("AppMock");
    MainApp.appTray.setContextMenu(contextMenu);
    MainApp.appTray.on("click", () => {
      MainApp.mainWindow.isVisible() ? MainApp.mainWindow.hide() : MainApp.mainWindow.show();
      MainApp.mainWindow.isVisible()
        ? MainApp.mainWindow.setSkipTaskbar(false)
        : MainApp.mainWindow.setSkipTaskbar(true);
    });
  }

  static start() {
    if (process.platform === "win32") {
      MainApp.app.disableHardwareAcceleration();
    }
    MainApp.app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
    // app.commandLine.appendSwitch("disable-gpu");
    // app.commandLine.appendSwitch("disable-software-rasterizer");
    MainApp.app.on("window-all-closed", MainApp.onWindowAllClosed);
    MainApp.app.on("ready", MainApp.onReady);
    // MainApp.app.on("activate", MainApp.createMainWindow);
  }

}
