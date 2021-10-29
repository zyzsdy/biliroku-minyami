import * as fs from 'fs'
import { parse } from 'comment-json'

const CONFIG_OVERRIDE = "config.json"

class Config {
    //配置部分
    httpPort: number = 46015;
    sk: string = ":=]IP@Q0Rm*ebwJRRtx6IdVE|D,HbfN)Da_ep'GY,$T#eaKQ>K|w17TgD4/42ATle<dej)=m-,1Z/Ep5?C,LutC:3P=-]3W)oH={hH@piHVP.TemJqoCVC>}#&0D/";


    //读取部分
    static config: Config = null;
    static getConfig() {
        if (Config.config == null) {
            Config.config = new Config();

            if (fs.existsSync(CONFIG_OVERRIDE)) {
                console.log(`Configuration file detected. Using ${CONFIG_OVERRIDE}`);
                let configJsonStr: string = fs.readFileSync(CONFIG_OVERRIDE, 'utf-8');
                Config.config = Object.assign(Config.config, parse(configJsonStr));
            } else {
                console.log(`No configuration file detected. Please copy config.default.json to config.json and modify the configuration.`);
            }
        }
        return Config.config;
    }
}

let cfg = Config.getConfig();
export default cfg;