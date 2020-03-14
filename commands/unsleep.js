let logger = require('winston');

exports.unsleep = (bot, message) => {
    try {
        bot.user.setPresence({
            status: 'online'
        });
        logger.info(`bot status back to online`);
        message.author.send({
            embed: {
                color: 0x57CC00,
                title: 'Утречка, я проснулся!',
            }
        });
    } catch (error) {
        message.author.send({
            embed: {
                color: 0xCC0016,
                title: 'Я не могу проснуться!',
                description: `${error}`
            }
        });
    }
}