import {Vec3} from "vec3";
import {Bot, BotOptions} from "mineflayer";

const mineflayer = require('mineflayer');
const v = require('vec3');
const data = require('minecraft-data')('1.16.5');

const botOptions: BotOptions = {
    host: 'localhost',
    username: 'player',
    checkTimeoutInterval: 1000 * 60 * 5
}


const bot = mineflayer.createBot(botOptions);

bot.on('error', console.log);

bot.on('kicked', () => {
    bot.connect(botOptions);
})

bot.on('entityHurt', () => {
    bot.chat('ouch');
});

bot.on('death', () => {
    bot.chat('ahhhhhh');
})

bot.on('spawn', async () => {
    bot.chat('hello');
/*    await bot.waitForTicks(20)
    let pos = bot.entity.position.floor();
    if (!pos.equals(spawn)) {
        throw new Error('bad pos ' + pos);
    }*/

    bot.on('whisper', async () => {

    })
    /*await bot.sleep(bot.blockAt(bed), (e: Error | undefined) => {
        console.log(e);
    });*/

    bot.chat('ready');
});

async function sleepWake(bot: Bot, bed: Vec3) {
    let error = (message: String) => {
        return new Error('Error while sleepWake at ' + bed + ': ' + message);
    }

    let block = bot.blockAt(bed);
    if (block === null) {
        throw error('Block not loaded');
    }

    await bot.activateBlock(block);
    await bot.waitForTicks(2);
    if (!bot.isSleeping) {
        throw error('Can\'t sleep. There must be an existing unoccupied bed within reach at night or during thunder not nearby monsters');
    }

    await bot.wake();
    await bot.waitForTicks(1);
    if (bot.isSleeping) {
        throw error('Can\'t wake up.');
    }
}

let spawn: Vec3 = new Vec3(188, 79, -225);
let bed: Vec3 = new Vec3(188, 79, -224);