let logger = require('../helpers/logger');

exports.sleep = (bot, message) => {
    try {
        bot.user.setPresence({
            status: 'idle'
        });
        logger.info(`bot status changed to idle`);
        message.author.send({
            embed: {
                color: 0x57CC00,
                title: 'Окей, я спать...',
                description: 'Разбуди меня потом командой `!unsleep`'
            }
        });
    } catch (error) {
        message.author.send({
            embed: {
                color: 0xCC0016,
                title: 'Я не могу уснуть!',
                description: `${error}`
            }
        });
    }

}