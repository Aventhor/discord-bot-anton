let logger = require('winston');
let commands = require('../commands/index');

module.exports = (bot, args) =>
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
        args[0] = setInterval(() =>
            commands.dropMeme(bot, process.env.MEME_CHANNEL_ID),
            3600000
        );
        logger.info(`auto meme posting is started`);
        args[1] = setInterval(() =>
            commands.dropNews(bot, process.env.NEWS_CHANNEL_ID, 'latest'),
            3600000
        );
        logger.info(`auto news posting is started`);
    });