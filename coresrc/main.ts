import { app, BrowserWindow, CommandLine } from "electron";
import * as path from "path";
import * as url from 'url'


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
        createWindow();

        app.on("activate", function () {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow()
            };
        });
    });

    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {
            app.quit();
        }
    });
}



function createWindow() {
    mainWindow = new BrowserWindow({
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
        width: 800,
    });

    if (process.env.NODE_ENV?.startsWith("develop")) {
        mainWindow.loadURL("http://localhost:3000");
    } else {
        mainWindow.loadURL(url.pathToFileURL(path.join(__dirname, "../build/index.html")).toString());
    }

    //TODO: 测试打开DevTools
    //mainWindow.webContents.openDevTools();
}
