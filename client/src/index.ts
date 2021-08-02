import {BotOptions} from 'mineflayer'
import BotHandler from './BotHandler.js'
import Environment from './Environment.js'
import './ConsoleHandler.js'
import {Vec3} from "vec3";

const environment = new Environment(process.argv.slice(2))

const botOptions: BotOptions = {
    host: environment.host,
    port: environment.port,
    username: environment.username,
    password: environment.password,
    checkTimeoutInterval: 1000 * 60 * 5,
}

new BotHandler(botOptions, environment)
