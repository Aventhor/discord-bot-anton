let commands = require('../commands/index');
let logger = require('winston');

module.exports = (bot) =>
    bot.on('message', function (message) {
        if (message.content.substring(0, 3) == '!ga') {
            let args = message.content.substring(1).split(' ');
            let cmd = args[1];

            args = args.splice(1);
            switch (cmd) {
                case 'help':
                    commands.help(bot, message);
                    break;
                case 'time':
                    logger.info(`${message.author.tag} used !ga time`);

                    let diff = getServerTimeDiff();

                    bot.channel.send("С момента создания сервера прошло:  " + diff + " дней");
                    break;
                case 'hi':
                    logger.info(`${message.author.tag} used !ga hi`);
                    message.channel.send(`${message.author}, рад тебя видеть, мой гагагашечка <:anton:581452820394278917> <:anton:581452820394278917> <:anton:581452820394278917>`);
                    break;
                case 'drop':
                    commands.dropMeme(bot, message);
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