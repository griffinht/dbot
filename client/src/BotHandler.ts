import {Bot, BotOptions} from "mineflayer";
import CommandHandler from "./CommandHandler.js";
import MoveHandler from "./MoveHandler.js";

const mineflayer = require('mineflayer')

const ops = [
    'Lem0nPickles',
]

export default class BotHandler {
    bot: Bot

    constructor(botOptions: BotOptions) {
        this.bot = mineflayer.createBot(botOptions)

        console.log('Creating bot with username ' + botOptions.username)

        this.bot.on('error', console.log)

        this.bot.on('login', () => {
            console.log('Logged in to ' + botOptions.host)
        })
        this.bot.on('spawn', () => {
            console.log('Spawned')
        })

        this.bot.on('kicked', (reason: String) => {
            console.log('Kicked: ' + reason)
        })

        this.bot.on('entityHurt', () => {
            console.log('entityHurt')
        })

        this.bot.on('death', () => {
            console.log('death')
        })





        this.bot.on('death', () => {
            this.bot.chat('ahhhhhh')
        })

        this.bot.on('entityHurt', () => {
            this.bot.chat('ouch')
        })

        this.bot.on('spawn', async () => {
            new CommandHandler(this.bot, ops, new MoveHandler(this.bot))

            console.log('Ready')
            for (let op in ops) {
                this.bot.whisper(op, 'ready')
            }
        })
    }
}