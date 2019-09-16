let commands = require('../commands/index');
let logger = require('winston');

module.exports =
    (bot, timer) =>
        bot.on('message', function (user, userID, channelID, message, evt) {
            if (bot.directMessages[channelID]) {
                if (message === '!s') {
                    commands.sys();
                }

                if (message.substring(0, 2) == '!r') {
                    let args = message.substring(0).split('!r ');
                    let msg = args[1];

                    args = args.splice(0, 1);
                    commands.replyMessage(bot, user, userID, '581451144077770754', msg);
                }

                if (message === '!sleep') {
                    botStatus = commands.sleep(bot, 1);
                }
                if (message === '!ga') {
                    commands.dropMeme(bot, userID);
                }
                if (message === '!stop meme-dropping') {
                    clearInterval(timer);
                    logger.info(`auto meme posting is stopped`);
                    bot.sendMessage({
                        to: userID,
                        message: `Автопостинг мемов отключен.`
                    });
                }
            }
        })
