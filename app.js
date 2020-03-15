let Discord = require('discord.js');
let logger = require('winston');

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';
let bot = new Discord.Client();
bot.login(process.env.TOKEN);

let memeTimer;
let newsTimer;

require('./events/index')(bot, memeTimer, newsTimer);

require('http').createServer().listen(3000)