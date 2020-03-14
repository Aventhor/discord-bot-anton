let logger = require('winston');

exports.reply = (bot, message, channelID, msg) => {
    if (msg != undefined || msg.length !== 0) {
        try {
            logger.info(message.author.tag + ` used !r with msg: ${msg}`);
            bot.channels.cache.get(channelID).send(`${msg}`);
            message.author.send({
                embed: {
                    color: 0x57CC00,
                    title: 'Сообщение отправлено!',
                    description: `> ${msg}`
                }
            });
            logger.info(`bot sended callback message to ${message.author.tag}`)
        }
        catch (error) {
            message.author.send({
                embed: {
                    color: 0xCC0016,
                    title: 'Сообщение не было отправлено!',
                    description: `> ${msg} \n ${error}`
                }
            });
            logger.error(`error on sending message with !r \n ${error}`)
        }
    }
}