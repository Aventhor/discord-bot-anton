let commands = require('../commands/index');
let logger = require('winston');

module.exports =
    (bot, timer) =>
        bot.on('message', function (message) {
            if (message.channel.type == 'dm') {
                if (message.content === '!s') {
                    commands.sys();
                }

                if (message.content.substring(0, 2) == '!r') {
                    let args = message.content.substring(0).split('!r ');
                    let msg = args[1];

                    args = args.splice(0, 1);
                    commands.replyMessage(bot, message, process.env.BOTS_CHANNEL_ID, msg);
                }

                if (message.content === '!sleep') {
                    botStatus = commands.sleep(bot, 1);
                }
                if (message.content === '!drop') {
                    commands.dropMeme(bot, message);
                }
                if (message.content === '!stop meme-dropping') {
                    clearInterval(timer);
                    logger.info(`auto meme posting is stopped by ${message.author.tag}`);
                    message.author.send(`Автопостинг мемов отключен.`);
                }
            }
        })
