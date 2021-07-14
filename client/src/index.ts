import {Vec3} from "vec3";
import {BotOptions} from "mineflayer";

const mineflayer = require('mineflayer');
const v = require('vec3');
const data = require('minecraft-data')('1.16.5');

const botOptions: BotOptions = {
    host: 'localhost',
    username: 'player'
}


console.log(v);
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

bot.on('spawn', () => {
    bot.chat('hello');
    bot.entity.position
});

let bed: Vec3 = new Vec3(188, 79, -224);