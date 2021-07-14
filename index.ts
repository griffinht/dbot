import { createBot } from 'mineflayer'
import { Bot } from 'mineflayer'

const bot: Bot = createBot({
    host: 'localhost',
    port: 25565,
    username: 'player',
    password: 'password'
});

bot.chat('hello');
bot.quit('you suck lol');