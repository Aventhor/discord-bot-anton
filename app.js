var sys = require('./sysinfo')
var Discord = require('discord.io');
var logger = require('winston');
// const { get } = require('snekfetch');
var goose = require('./commands/gooseMeme');

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';
var bot = new Discord.Client({
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
    bot.setPresence({ game: { name: "!ga help", type: 3 } });
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
        var args = message.substring(1).split(' ');
        var cmd = args[1];

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
                var info = getInfo();
                bot.sendMessage({
                    to: channelID,
                    message: `${info}`,
                });
                break;
            case 'time':
                logger.info(user + ' used ga time');

                var diff = getServerTimeDiff();

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
                goose.run(bot, user, channelID);
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
            sys.getInfo();
        }
        // if (message === '!ga drop') {
        //     goose.run(bot, user, userID);
        // }

        if (message.substring(0, 2) == '!r') {
            var args = message.substring(0).split('!r ');
            var msg = args[1];

            args = args.splice(0, 1);
            if (cmd != undefined || msg.length !== 0) {
                try {
                    bot.sendMessage({
                        to: "581451144077770754",
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
    }
});

function getServerTimeDiff() {
    var today = new Date();
    var serverCreated = new Date(2019, 4, 23, 15, 25);
    var diff = today - serverCreated;
    diff = Math.ceil(diff / (1000 * 3600 * 24));
    return diff;
}
require('http').createServer().listen(3000)