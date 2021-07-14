import {Vec3} from "vec3"
import {Bot, BotOptions} from "mineflayer"
import {Block} from "prismarine-block";

const mineflayer = require('mineflayer')
const v = require('vec3')
//const data = require('minecraft-data')('1.16.5')

const botOptions: BotOptions = {
    host: 'localhost',
    username: 'playerrr',
    checkTimeoutInterval: 1000 * 60 * 5,
}

const ops = [
    'Lem0nPickles',
]



const bot = mineflayer.createBot(botOptions)

bot.on('error', console.log)

bot.on('kicked', (reason: String) => {
    console.log('kicked ' + reason);
})

bot.on('entityHurt', () => {
    bot.chat('ouch')
})

bot.on('death', () => {
    bot.chat('ahhhhhh')
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
                switch (message) {
                    case "mine":
                        bot.whisper(username, 'mining')
                        mine(bot, new Vec3(0, 0, 0), new Vec3(0, 0, 0), new Vec3(1, 0, 0));
                        break
                    case "sleepwake":
                        await sleepWake(bot, bed)
                        bot.whisper(username, 'slept')
                        break
                    default:
                        throw new Error("Unknown command " + message)
                }
            } catch (e) {
                if (e instanceof Error) {
                    bot.whisper(username, e.message)
                }
            }
        }
    })
})

async function sleepWake(bot: Bot, bed: Vec3) {
    try {
        let block = getBlock(bot, bed);

        await bot.activateBlock(block)
        await bot.waitForTicks(2)
        if (!bot.isSleeping) {
            throw new Error('Can\'t sleep. There must be an existing unoccupied bed within reach at night or during thunder not nearby monsters')
        }

        await bot.wake()
        await bot.waitForTicks(1)
        if (bot.isSleeping) {
            throw new Error('Can\'t wake up.')
        }
    } catch (e) {
        if (e instanceof Error) {
            throw new Error('Error while sleepWake at ' + bed + ': ' + e.message)
        } else {
            throw e;
        }
    }
}

async function mine(bot: Bot, input: Vec3, output: Vec3, add: Vec3) {
    let bottom = true;
    let up = new Vec3(0, 1, 0);
    bot.lookAt(bot.entity.position.clone().add(add));
    bot.setControlState('forward', true);
    while (true) {
        let pos = bot.entity.position.clone().add(add);
        if (!bottom) {
            pos.add(up);
        }
        await bot.dig(getBlock(bot, pos), false);
        await bot.waitForTicks(2);
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

let spawn: Vec3 = new Vec3(188, 79, -225)
let bed: Vec3 = new Vec3(188, 79, -224)