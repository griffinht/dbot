import {Bot, ChatMessage} from "mineflayer";

// §6Enter  §aPlayer  §bLogsnitch  §e[0 0 0]  §a[8m §cSouth West§a]

export default class SnitchHandler {
    bot: Bot

    constructor(bot: Bot) {
        this.bot = bot

        // 'chat' | 'system' | 'game_info'
        this.bot.on('message', (jsonMsg: ChatMessage, position: string) => {
            console.log(position)
            if (position !== 'system') {
                return
            }

            console.log(jsonMsg)
        })
    }
}