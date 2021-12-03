import { app, BrowserWindow } from "electron";
import startApp from './serverapp';

function main() {
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

        app.on("ready", async () => {
            let port = await startApp();
            createWindow(mainWindow, port);

            app.on("activate", function () {
                if (BrowserWindow.getAllWindows().length === 0) {
                    createWindow(mainWindow, port);
                };
            });
        });

        app.on("window-all-closed", () => {
            if (process.platform !== "darwin") {
                app.quit();
            }
        });
    }
}

function createWindow(mainWindow: BrowserWindow, port: number) {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    mainWindow.loadURL("http://localhost:" + port);
    //TODO: 测试打开DevTools
    //mainWindow.webContents.openDevTools();
}

//RUN MAIN FUNCTION
main();