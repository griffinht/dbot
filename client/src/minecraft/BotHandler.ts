import {Bot, BotOptions} from "mineflayer";
import CommandHandler from "./handler/CommandHandler.js";
import MoveHandler from "./handler/MoveHandler.js";
import FarmHandler from "./handler/FarmHandler.js";
import SnitchHandler, {SnitchAction} from "./SnitchHandler.js";
import ViewerHandler from "./handler/ViewerHandler";
import Environment from "./Environment";
import Dbot from "../discord/dbot";
import {Vec3} from "vec3";

// static es6 import breaks things :(
const createBot = require('mineflayer').createBot
//import {createBot} from "mineflayer";

export default class BotHandler {
    bot: Bot

    constructor(botOptions: BotOptions, environment: Environment, snitch?: (username: string, action: SnitchAction, location: Vec3) => void) {
        console.log('Creating bot with username ' + botOptions.username)
        this.bot = createBot(botOptions)
        this.bot.on('error', (e) => {
            console.log('Logging error:')
            console.log(e)
        })

        this.bot.on('login', () => console.log('Logged in to ' + botOptions.host))
        this.bot.on('spawn', () => console.log('Spawned'))
        this.bot.on('kicked', (reason: String) => console.log('Kicked: ' + reason))
        this.bot.on('entityHurt', () => console.log('entityHurt'))
        this.bot.on('death', () => console.log('death'))

        this.bot.on('spawn', async () => {
            let moveHandler = new MoveHandler(this.bot)
            new CommandHandler(this.bot, environment.ops, moveHandler, new FarmHandler(this.bot, moveHandler))

            if (snitch === undefined) snitch = (username: string, action: SnitchAction, location: Vec3) => console.log(username + ' ' + action + ' ' + location)
            new SnitchHandler(this.bot, snitch)
            //new ViewerHandler(environment.viewerPort, this.bot, moveHandler)

            console.log('Ready')
        })
    }
}