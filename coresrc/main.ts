import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from 'url';
import startApp from './serverapp';


//单例锁
let mainWindow: BrowserWindow = null;
const singleInstanceLock = app.requestSingleInstanceLock();

if (!singleInstanceLock) {
    app.quit(); //已经存在一个实例了，本实例自行退出
} else {
    app.on("second-instance", (event, commandLine, workingDirectory) => {
        if (mainWindow) {
            mainWindow.show();
            if (mainWindow.isMinimized()) {
                mainWindow.restore();
            }
            mainWindow.focus();
        }
    });

    app.on("ready", () => {
        let port = startApp();
        createWindow(port);

        app.on("activate", function () {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow(port);
            };
        });
    });

    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {
            app.quit();
        }
    });
}



function createWindow(port: number) {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        }
    });

    mainWindow.loadURL("http://localhost:" + port);
    //TODO: 测试打开DevTools
    //mainWindow.webContents.openDevTools();
}
