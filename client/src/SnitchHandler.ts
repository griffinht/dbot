import {Bot, ChatMessage} from "mineflayer";
import {Vec3} from "vec3";
import Dbot from "../discord/dbot";
import {Snowflake} from "discord.js";

export type SnitchAction = 'Enter' | 'Login' | 'Logout'

export default class SnitchHandler {
    constructor(bot: Bot, snitch: (username: string, action: SnitchAction, location: Vec3) => void) {

        // 'chat' | 'system' | 'game_info'
        bot.on('message', (jsonMsg: ChatMessage, position: string) => {
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
                            snitch(split[1], split[0], new Vec3(parseInt(split[3].slice(1)), parseInt(split[4]), parseInt(split[5].slice())))
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

