import * as Koa from 'koa';
import * as serve from 'koa-static';
import * as path from "path";
import config from './config/config'


function startApp() {
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