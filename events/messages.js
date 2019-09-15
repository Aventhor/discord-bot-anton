let commands = require('../commands/index');

module.exports = (bot) =>
    bot.on('message', function (user, userID, channelID, message, evt) {
        if (message.substring(0, 3) == '!ga') {
            let args = message.substring(1).split(' ');
            let cmd = args[1];

            args = args.splice(1);
            switch (cmd) {
                case 'help':
                    commands.help(bot, user, channelID);
                    break;
                case 'time':
                    logger.info(user + ' used ga time');

                    let diff = getServerTimeDiff();

                    bot.sendMessage({
                        to: channelID,
                        message: "С момента создания сервера прошло:  " + diff + " дней",
                    });
                    break;
                case 'hi':
                    logger.info(user + ' used ga hi');
                    bot.sendMessage({
                        to: channelID,
                        message: "<@!" + userID + ">, рад тебя видеть, мой гагагашечка <:anton:581452820394278917> <:anton:581452820394278917> <:anton:581452820394278917>",
                    });
                    break;
                case 'role':
                    bot.sendMessage({
                        to: userID,
                        message: "Твои роли на сервере: " + bot.servers["581184926766858240"].members[userID].roles.id,
                    });
                    break;
                case 'drop':
                    commands.dropMeme(bot, channelID);
                    break;
            }
        }

    });

function getServerTimeDiff() {
    let today = new Date();
    let serverCreated = new Date(2019, 4, 23, 15, 25);
    let diff = today - serverCreated;
    diff = Math.ceil(diff / (1000 * 3600 * 24));
    return diff;
}