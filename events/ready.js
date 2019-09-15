let logger = require('winston');
let commands = require('../commands/index');

module.exports = (bot, timer) =>
    bot.on('ready', function (evt) {
        logger.info('Connected');
        logger.info('Logged in as: ');
        logger.info(bot.username + ' - (' + bot.id + ')');
        bot.setPresence({
            game: {
                name: "!ga help",
                type: 3,
            },
            status: 'online'
        });
        timer = setInterval(() =>
            commands.dropMeme(bot, '622528610426683393'),
            3600000
        );
        logger.info(`auto meme posting is started`);
    });