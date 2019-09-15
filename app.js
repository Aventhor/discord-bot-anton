let Discord = require('discord.io');
let logger = require('winston');

let timer;

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';
let bot = new Discord.Client({
    token: process.env.TOKEN,
    autorun: true
});

require('./events/index')(bot, timer);

require('http').createServer().listen(3000)