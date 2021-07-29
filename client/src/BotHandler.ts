import {Bot, BotOptions} from "mineflayer";
import CommandHandler from "./handler/CommandHandler.js";
import MoveHandler from "./handler/MoveHandler.js";
import FarmHandler from "./handler/FarmHandler.js";
import SnitchHandler from "./handler/SnitchHandler.js";
import ViewerHandler from "./handler/ViewerHandler";
import Environment from "./Environment";

// static es6 import breaks things :(
const createBot = require('mineflayer').createBot
//import {createBot} from "mineflayer";

export default class BotHandler {
    bot: Bot

    constructor(botOptions: BotOptions, environment: Environment) {
        console.log('Creating bot with username ' + botOptions.username)
        this.bot = createBot(botOptions)
        this.bot.on('error', (e) => {
            console.log('heleodfisdfoijsdf')
            console.log(e)
        })

        this.bot.on('login', () => console.log('Logged in to ' + botOptions.host))
        this.bot.on('spawn', () => console.log('Spawned'))
        this.bot.on('kicked', (reason: String) => console.log('Kicked: ' + reason))
        this.bot.on('entityHurt', () => console.log('entityHurt'))
        this.bot.on('death', () => console.log('death'))

        this.bot.on('death', () => this.bot.chat('ahhhhhh'))
        this.bot.on('entityHurt', () => this.bot.chat('ouch'))
        this.bot.on('spawn', async () => {
            let moveHandler = new MoveHandler(this.bot)
            new CommandHandler(this.bot, environment.ops, moveHandler, new FarmHandler(this.bot, moveHandler))
            new SnitchHandler(this.bot)
            //new ViewerHandler(environment.viewerPort, this.bot, moveHandler)

            console.log('Ready')
            for (let op in environment.ops) {
                this.bot.whisper(op, 'ready')
            }
        })
    }
}