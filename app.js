const Discord = require('discord.js');
const http = require('http');
const logger = require('./helpers/logger')

const bot = new Discord.Client();
bot.login(process.env.TOKEN);

let memeTimer;
let newsTimer;

require('./events/index')(bot, memeTimer, newsTimer);

http.createServer().listen(3000, () => logger.info('Server is started!'))