let logger = require('winston');
let commands = require('../commands/index');

module.exports = (bot, timer) =>
    bot.on('ready', () => {
        logger.info('Connected');
        logger.info('Logged in as: ');
        logger.info(bot.user.username + ' - (' + bot.user + ')');
        bot.user.setPresence({
            activity: {
                name: "!ga help",
                type: 2
            },
            status: 'online'
        });
        timer = setInterval(() =>
            commands.dropMeme(bot, process.env.MEME_CHANNEL_ID),
            3600000
        );
        logger.info(`auto meme posting is started`);
    });