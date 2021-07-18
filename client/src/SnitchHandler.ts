import {Bot} from "mineflayer";

// §6Enter  §aPlayer  §bLogsnitch  §e[0 0 0]  §a[8m §cSouth West§a]

export default class SnitchHandler {
    bot: Bot

    constructor(bot: Bot) {
        this.bot = bot
        this.bot.on('message', (jsonMsg: any, position: any) => {
            console.log('hello')
        })
    }
}