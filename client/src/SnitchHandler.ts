import {Bot} from "mineflayer";

export default class SnitchHandler {
    bot: Bot

    constructor(bot: Bot) {
        this.bot = bot
        this.bot.on('message', (jsonMsg: any, position: any) => {
            console.log('hello')
        })
    }

}