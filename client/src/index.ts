import {BotOptions} from 'mineflayer'
import BotHandler from './minecraft/BotHandler.js'
import Environment from './minecraft/Environment.js'
import './ConsoleHandler.js'
import {makeBot} from "./discord/dbot.js";

const environment = new Environment(process.argv.slice(2))

const botOptions: BotOptions = {
    host: environment.host,
    port: environment.port,
    username: environment.username,
    password: environment.password,
    checkTimeoutInterval: 1000 * 60 * 5,
}

//new BotHandler(botOptions, environment)
if (environment.token !== undefined) {
    console.log('Creating Discord bot')
    makeBot(environment.token)
}
