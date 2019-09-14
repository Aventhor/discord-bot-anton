let Discord = require('discord.io');
let logger = require('winston');
let commands = require('./commands/index');

const Statuses = {
    '1': 'online',
    '2': 'idle'
}

let botStatus = Statuses['1'];

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';
let bot = new Discord.Client({
    token: process.env.TOKEN,
    autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    // bot.sendMessage({
    //     to: "581451144077770754",
    //     message: "📣 Гусь Антон на месте! Пляшем вместе!",
    // });
    bot.setPresence({
        game: { name: "!ga help", type: 3 },
        status: botStatus
    });
});

bot.on("guildMemberAdd", member => {
    bot.sendMessage({
        to: "581184926766858242",
        message: "<@!" + member.id + ">, приветствуем тебя в гусиной империи! Веди себя хорошо, иначе я тебя пощипаю!",
    });
    bot.sendMessage({
        to: member.id,
        message: "Привет, я Гусь Антон. Также, меня еще называют гусём-пацифистом, но ты называй меня просто - Антошка <:heart:> Добро пожаловать в гусиную империю, надеюсь ты сослужишь добрую службу. <:exclamation:> И запомни нашу простую истину: ***Будь Гусём, Гусь за Гуся, ничего кроме Гусей***. Удачи! ГА!",
    });
});
bot.on("guildRoleUpdate", function (oldRole, newRole) {
    bot.sendMessage({
        to: "581184926766858242",
        message: "<@!" + member.id + ">, приветствуем тебя в гусиной империи! Веди себя хорошо, иначе я тебя пощипаю!",
    });
    bot.sendMessage({
        to: member.id,
        message: "Привет, я Гусь Антон. Также, меня еще называют гусём-пацифистом, но ты называй меня просто - Антошка <:heart:> Добро пожаловать в гусиную империю, надеюсь ты сослужишь добрую службу. <:exclamation:> И запомни нашу простую истину: ***Будь Гусём, Гусь за Гуся, ничего кроме Гусей***. Удачи! ГА!",
    });
});
bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.substring(0, 3) == '!ga' || message.substring(0, 3) == '-ga') {
        let args = message.substring(1).split(' ');
        let cmd = args[1];

        args = args.splice(1);
        switch (cmd) {
            case 'help':
                logger.info(user + ' used ga help');
                bot.sendMessage({
                    to: channelID,
                    message: "Вот список моих команд: `!ga hi`, `!ga time`, `!ga drop`",
                });
                break;
            case 'sys':
                logger.info(user + ' used ga sys');
                let info = getInfo();
                bot.sendMessage({
                    to: channelID,
                    message: `${info}`,
                });
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
                commands.dropMeme(bot, user, channelID);
                break;
            case 'boom':
                logger.info(user + ' used ga boom');
                timeId = setInterval(function () {
                    bot.sendMessage({
                        to: channelID,
                        message: `This is ထ, gg`,
                    });
                }, 1000);
                setTimeout(function () {
                    clearInterval(timeId);
                }, 5000);
                break;
        }
    }
    if (bot.directMessages[channelID]) {
        if (message === '!s') {
            commands.sys();
        }

        if (message.substring(0, 2) == '!r') {
            let args = message.substring(0).split('!r ');
            let msg = args[1];

            args = args.splice(0, 1);
            commands.replyMessage(bot, user, userID, '581451144077770754', msg);
        }

        if (message === '!sleep') {
            botStatus = commands.sleep(bot, botStatus, Statuses, 1);
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
require('http').createServer().listen(3000)