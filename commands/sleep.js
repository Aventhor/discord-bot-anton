let logger = require('winston');

exports.sleep = (bot, time) => {
    console.log(bot.presenceStatus)
    if (bot.presenceStatus === 'online') {
        bot.setPresence({
            status: 'idle'
        });
        logger.info(`bot status changed to idle`);
        if (time) {
            time *= 10000;
            setTimeout(
                () => bot.setPresence({
                    status: 'online'
                }),
                time
            )
        }
    }
}