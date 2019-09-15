let Discord = require('discord.io');
let logger = require('winston');
let commands = require('./commands/index');

const Statuses = {
    '1': 'online',
    '2': 'idle'
}

let botStatus = Statuses['1'];
let timer;

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
    bot.setPresence({
        game: {
            name: "!ga help",
            type: 3,
        },
        status: botStatus
    });
    timer = setInterval(() =>
        commands.dropMeme(bot, '622528610426683393'),
        7200000
    );
    logger.info(`auto meme posting is started`);
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

        if (message === '!stop meme-dropping') {
            clearInterval(timer);
            logger.info(`auto meme dropping is stopped`);
            bot.sendMessage({
                to: userID,
                message: `Автопостинг мемов отключен.`
            });
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