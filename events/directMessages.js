let commands = require('../commands/index');
let logger = require('winston');

module.exports =
    (bot, timer) =>
        bot.on('message', function (message) {
            if (message.channel.type == 'dm' && message.content.substring(0, 1) == '!') {
                let args = message.content.substring(0).split('!');
                let msg = args[1];

                if (msg === 's') {
                    commands.sys();
                }

                if (msg.substring(0, 1) == 'r') {
                    let args = message.content.substring(0).split('!r ');
                    let msg = args[1];

                    commands.replyMessage(bot, message, process.env.BOTS_CHANNEL_ID, msg);
                }

                if (msg === 'sleep') {
                    botStatus = commands.sleep(bot, message);
                }
                if (msg === 'unsleep') {
                    botStatus = commands.unsleep(bot, message);
                }
                if (msg === 'drop') {
                    commands.dropMeme(bot, message.channel.id);
                }
                if (msg.substring(0, 4) === 'news') {
                    let args = message.content.substring(0).split('news');
                    let param = args[1];

                    if (param === ':random')
                        commands.dropNews(bot, message, 'random');
                    else if (param === ':latest' || param === '')
                        commands.dropNews(bot, message, 'latest');
                }
                if (msg === 'help') {
                    commands.help(bot, message);
                }
                if (msg === 'stop meme-dropping') {
                    clearInterval(timer);
                    logger.info(`auto meme posting is stopped by ${message.author.tag}`);
                    message.author.send(`Автопостинг мемов отключен.`);
                }
            }
        })
