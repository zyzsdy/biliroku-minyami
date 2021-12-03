import "reflect-metadata";
import dbConn from './loadDbModels'
import * as Koa from 'koa';
import * as serve from 'koa-static';
import * as path from "path";
import config from './config'


async function startApp() {
    const conn = await dbConn;
    const app = new Koa();

    const port: number = config.httpPort;

    const home = serve(path.join(__dirname, "../build/"));

    app.use(home);
    app.listen(port, () => {
        console.log(`HTTP Server is running at port ${port}.`);
    });

    return port;
}

export default startApp;