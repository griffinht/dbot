import {Bot, BotOptions} from "mineflayer";
import CommandHandler from "./CommandHandler.js";
import MoveHandler from "./MoveHandler.js";
import FarmHandler from "./FarmHandler.js";
import SnitchHandler from "./SnitchHandler.js";

const mineflayer = require('mineflayer')

export default class BotHandler {
    bot: Bot

    constructor(botOptions: BotOptions, ops: string[]) {
        console.log('Creating bot with username ' + botOptions.username)
        this.bot = mineflayer.createBot(botOptions)
        this.bot.on('error', console.log)

        this.bot.on('login', () => console.log('Logged in to ' + botOptions.host))
        this.bot.on('spawn', () => console.log('Spawned'))
        this.bot.on('kicked', (reason: String) => console.log('Kicked: ' + reason))
        this.bot.on('entityHurt', () => console.log('entityHurt'))
        this.bot.on('death', () => console.log('death'))

        this.bot.on('death', () => this.bot.chat('ahhhhhh'))
        this.bot.on('entityHurt', () => this.bot.chat('ouch'))
        this.bot.on('spawn', async () => {
            let moveHandler = new MoveHandler(this.bot)
            new CommandHandler(this.bot, ops, moveHandler, new FarmHandler(this.bot, moveHandler))
            new SnitchHandler(this.bot)

            console.log('Ready')
            for (let op in ops) {
                this.bot.whisper(op, 'ready')
            }
        })
    }
}