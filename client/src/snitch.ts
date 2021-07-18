//§6Enter  §aWheelOf4Chan  §bLogsnitch  §e[2111 59 -12185]  §a[8m §cSouth West§a]

import {Bot} from "mineflayer";

class Snitch {
    bot: Bot

    constructor(bot: Bot) {
        this.bot = bot
        this.bot.on('message', (jsonMsg: any, position: any) => {
            console.log('hello')
        })
    }

}