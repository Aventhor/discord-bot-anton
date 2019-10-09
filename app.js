let Discord = require('discord.js');
let logger = require('winston');

let timer;

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';
let bot = new Discord.Client();
bot.login(process.env.TOKEN);

require('./events/index')(bot, timer);

require('http').createServer().listen(3000)