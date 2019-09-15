let logger = require('winston');

exports.reply = (bot, user, userID, channelID, msg) => {
    if (msg != undefined || msg.length !== 0) {
        try {
            bot.sendMessage({
                to: channelID,
                message: `${msg}`,
            });
            logger.info(user + ` used !r with msg: ${msg}`);
            bot.sendMessage({
                to: userID,
                message: '',
                embed: {
                    color: 0x57CC00,
                    title: 'Сообщение отправлено!',
                    description: `> ${msg}`
                }
            });
            logger.info(`bot sended callback message to ${user}`)
        }
        catch (error) {
            bot.sendMessage({
                to: userID,
                message: '',
                embed: {
                    color: 0xCC0016,
                    title: 'Сообщение не было отправлено!',
                    description: `> ${msg} \n ${error}`
                }
            });
            logger.info(`error on sending message with !r \n ${error}`)
        }
    }
}