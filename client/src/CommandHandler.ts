import {Bot, ControlState} from "mineflayer";
import {mine} from "./miner.js";
import {Vec3} from "vec3";
import {strictParseInt, strictParseInts, toVec3} from "./util.js";
import FarmHandler from "./FarmHandler.js";
const data = require('minecraft-data')('1.16.5')

export default class CommandHandler {
    constructor(bot: Bot, ops: string[], farmHandler: FarmHandler) {
        bot.on('whisper', async (username: string, message: string) => {
            if (!ops.includes(username)) {
                console.log(username + ': ' + message)
                return
            }

            try {
                let split: string[] = message.split(' ')
                if (split.length === 0) {
                    bot.whisper(username, 'No arguments specified')
                }
                switch (split[0]) {
                    case 'mine':
                        bot.whisper(username, 'mining')
                        mine(bot, new Vec3(0, 0, 0), new Vec3(0, 0, 0), new Vec3(1, 0, 0))
                        break
                    case 'farm':
                        let usage = 'Usage: farm start (x y z) length width rows input (x y z)'
                        let start
                        let length
                        let width
                        let rows
                        let input
                        try {
                            start = toVec3(strictParseInts(split, 1, 3))
                            length = strictParseInt(split[4])
                            width = strictParseInt(split[5])
                            rows = strictParseInt(split[6])
                            input = toVec3(strictParseInts(split, 1 + 6, 3))
                        } catch (e) {
                            if (e instanceof Error) {
                                bot.whisper(username, e.message + '. ' + usage)
                                break
                            } else {
                                throw e
                            }
                        }
                        bot.whisper(username, 'Farming ' + length + 'x' + width + ' area with ' + rows + ' rows starting at ' + start)
                        await farmHandler.farm(data.itemsByName.wheat_seeds, start, length, width, rows, input)
                        bot.whisper(username, 'Farming complete')
                        break
                    case 'farmstop':
                        bot.whisper(username, 'Stopping')
                        farmHandler.stop()
                        break
                    case 'move':
                        let move = async (direction: ControlState, ticks: number) => {
                            bot.setControlState(direction, true)
                            await bot.waitForTicks(ticks)
                            bot.setControlState(direction, false)
                        }
                        let ticks = 5;
                        if (split.length <= 1) {
                            bot.whisper(username, 'Not enough movement arguments')
                            return;
                        }
                        for (let i = 0; i < split[1].length; i++) {
                            let direction: ControlState;
                            let raw = split[1].charAt(i)
                            switch (raw) {
                                case 'w':
                                    direction = 'forward'
                                    break
                                case 'a':
                                    direction = 'left'
                                    break
                                case 's':
                                    direction = 'back'
                                    break
                                case 'd':
                                    direction = 'right'
                                    break
                                case 'j':
                                    direction = 'jump'
                                    break
                                default:
                                    bot.whisper(username, 'Unknown direction ' + raw)
                                    return
                            }
                            await move(direction, direction !== 'jump' ? ticks : 0)
                        }
                        break
                    case 'look':
                        if (split.length !== 4) {
                            bot.whisper(username, 'Incorrect arguments, try look x y z')
                            return
                        }

                        bot.lookAt(bot.entity.position.clone().add(toVec3(strictParseInts(split, 1, 3))))
                        break
                    default:
                        bot.whisper(username, 'Unknown command ' + message)
                }
            } catch (e) {
                if (e instanceof Error) {
                    bot.whisper(username, 'Error: ' + e.message)
                } else {
                    throw e
                }
            }
        })
    }
}