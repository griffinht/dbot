import {BotOptions} from 'mineflayer'
import BotHandler from "./BotHandler.js";

const environment: Environment = new class implements Environment {
    host = process.argv[2]
    port = process.argv[3]
    username = process.argv[4]
    password = process.argv[5]
}

const botOptions: BotOptions = {
    host: environment.host,
    port: parseInt(environment.port),
    username: environment.username,
    password: environment.password,
    checkTimeoutInterval: 1000 * 60 * 5,
}

new BotHandler(botOptions)
