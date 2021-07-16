import {Vec3} from 'vec3'
import {Bot, BotOptions} from 'mineflayer'
import {Block} from 'prismarine-block';
import {createDeflateRaw} from "zlib";

const environment: Environment = require('./bin/environment')
const mineflayer = require('mineflayer')
const v = require('vec3')
//const data = require('minecraft-data')('1.16.5')

const botOptions: BotOptions = {
    host: environment.host,
    username: environment.username,
    password: environment.password,
    checkTimeoutInterval: 1000 * 60 * 5,
}

const ops = [
    'Lem0nPickles',
]

console.log('Creating bot with username ' + botOptions.username)

const bot = mineflayer.createBot(botOptions)

bot.on('error', console.log)

bot.on('login', () => {
    console.log('Logged in to ' + botOptions.host)
})
bot.on('spawn', () => {
    console.log('Spawned')
})

bot.on('kicked', (reason: String) => {
    console.log('Kicked: ' + reason)
})

bot.on('entityHurt', () => {
    console.log('entityHurt')
})

bot.on('death', () => {
    console.log('death')
})





bot.on('death', () => {
    bot.chat('ahhhhhh')
})

bot.on('entityHurt', () => {
    bot.chat('ouch')
})

bot.on('spawn', async () => {
    bot.chat('hello')
/*    await bot.waitForTicks(20)
    let pos = bot.entity.position.floor()
    if (!pos.equals(spawn)) {
        throw new Error('bad pos ' + pos)
    }*/

    bot.on('whisper', async (username: string, message: string) => {
        if (ops.includes(username)) {
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
                    case 'plant':
                        bot.whisper(username, 'planting')
                        plant(bot, new Vec3(-129, 71, -174), new Vec3(0, 0, 1), 31)
                        break
                    case 'move':
                        let move = async (direction: string, ticks: number) => {
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
                            let direction: string;
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
                            bot.whisper(username, 'Incorrect arguments, try look 0 0 0')
                            return
                        }

                        let coords = parseInts(split, 1, 3)
                        bot.lookAt(bot.entity.position.clone().add(new Vec3(coords[0], coords[1], coords[2])))
                        break
                    default:
                        bot.whisper(username, 'Unknown command ' + message)
                }
            } catch (e) {
                if (e instanceof Error) {
                    bot.whisper(username, 'Error: ' + e.message)
                }
            }
        }
    })
})

function parseInts(strings: string[], offset: number, amount: number): number[] {
    let numbers: number[] = [];

    if (strings.length - 1 < amount) {
        throw new Error('Not enough arguments')
    }

    for (let i = 0; i < strings.length && (amount <= 0 || i < amount); i++) {
        numbers[i] = parseInt(strings[i + 1])
        if (isNaN(numbers[i])) {
            throw new Error(strings[i + 1] + ' is not a number')
        }
    }

    return numbers;
}

async function mine(bot: Bot, input: Vec3, output: Vec3, add: Vec3) {
    let bottom = true;
    let up = new Vec3(0, 1, 0);
    bot.lookAt(bot.entity.position.clone().add(add));
    bot.setControlState('forward', true);
    while (true) {
        let pos = bot.entity.position.clone().add(add);
        await bot.dig(getBlock(bot, pos));
        await bot.dig(getBlock(bot, pos.add(up)));
        bottom = !bottom;
    }
}

function getBlock(bot: Bot, vec3: Vec3): Block {
    let block = bot.blockAt(vec3);
    if (block === null) {
        throw new Error('Block at ' + vec3 + ' not loaded');
    }

    return block;
}

async function plant(bot: Bot, start: Vec3, add: Vec3, length: number) {
    await moveTo(bot, start)
    //while (true) {
    let pos = start.clone().subtract(new Vec3(-4, 0, 0))
    for (let i = 0; i < 8; i++) {
        console.log(pos)
        await bot.placeBlock(getBlock(bot, pos), new Vec3(0, 1, 0))
        pos.add(new Vec3(-1, 0, 0))
    }
    start.add(add)
    //}
}

function moveTo(bot: Bot, target: Vec3): Promise<void> {
    let realTarget = target.clone().add(new Vec3(0.5, 0.5, 0.5))
    return new Promise(async (resolve, reject) => {
        await bot.lookAt(realTarget)
        await bot.setControlState('forward', true)
        bot.on('move', async () => {
            await bot.lookAt(realTarget)
            if (bot.entity.position.clone().floor().equals(target)) {
                await bot.setControlState('forward', false)
                resolve()
            }
        })
    })
}