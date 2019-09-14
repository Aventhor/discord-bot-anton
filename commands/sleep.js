let logger = require('winston');

exports.sleep = (bot, status, Statuses, args) => {

    if (status == Statuses[1]) {
        bot.setPresence({
            status: Statuses['2']
        });
        logger.info(`bot status changed to idle`);
        if (args) {
            args *= 10000;
            setTimeout(
                () => bot.setPresence({
                    status: Statuses['1']
                }),
                args
            )
        }
        return 'idle';
    }
}