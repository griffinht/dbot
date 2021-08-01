import {BotOptions} from 'mineflayer'
import BotHandler from './minecraft/BotHandler.js'
import Environment from './minecraft/Environment.js'
import './ConsoleHandler.js'
import Dbot from "./discord/dbot";
import {SnitchAction} from "./minecraft/SnitchHandler";
import {Vec3} from "vec3";

const environment = new Environment(process.argv.slice(2))

const botOptions: BotOptions = {
    host: environment.host,
    port: environment.port,
    username: environment.username,
    password: environment.password,
    checkTimeoutInterval: 1000 * 60 * 5,
}

let snitch
if (environment.token !== undefined) {
    console.log('Creating Discord bot')
    let dbot = new Dbot(environment.token)
    snitch = (username: string, action: SnitchAction, location: Vec3) => dbot.sendMessage('871161933234065468', username + ' ' + action + ' ' + location)
}
new BotHandler(botOptions, environment, snitch)
