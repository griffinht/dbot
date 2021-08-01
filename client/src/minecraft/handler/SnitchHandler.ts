import {Bot, ChatMessage} from "mineflayer";
import {Vec3} from "vec3";

export default class SnitchHandler {
    bot: Bot

    constructor(bot: Bot) {
        this.bot = bot

        // 'chat' | 'system' | 'game_info'
        this.bot.on('message', (jsonMsg: ChatMessage, position: string) => {
            switch (position) {
                case 'system':
                    let message = jsonMsg.toString() // remove color codes, combine
                        .replace(/\s+/g,' ') // remove extra spaces
                    let split = message.split(' ')
                    console.log(message)
                    switch (split[0]) {
                        case 'Enter':
                        case 'Login':
                        case 'Logout':
                            snitch(split[0], split[1], new Vec3(parseInt(split[3].slice(1)), parseInt(split[4]), parseInt(split[5].slice())))
                            break
                        default:
                            console.log('unknown')
                    }
                    break
                default:
                    console.log('unknown position ' + position)
            }
        })
    }
}

type SnitchAction = 'Enter' | 'Login' | 'Logout'

function snitch(action: SnitchAction, username: string, position: Vec3) {
    console.log(action + ' by ' + username + ' at ' + position)
}