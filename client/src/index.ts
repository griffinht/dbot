import { Bot, createBot } from "mineflayer";

const bot: Bot = createBot({
    host: 'localhost',
    port: 25565,
    username: 'player',
    password: 'password'
});

console.log(bot);
bot.chat('hello');
bot.quit('you suck lol');