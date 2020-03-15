let logger = require('winston');

exports.help = (bot, message) => {
    message.channel.send({
        embed: {
            color: 0x50EBAC,
            title: 'Помощь',
            description: 'Список доступных команд \nИспользуйте префикс `!ga`',
            thumbnail: {
                url: 'https://cdn.discordapp.com/app-icons/575742784095518723/87ac88ba0168f4e6a50cd7218fc48556.png',
            },
            fields: [
                {
                    name: `hi`,
                    value: `Антон поприветствует вас`
                },
                {
                    name: `time`,
                    value: `Время, прошедшее с момента создания сервера`
                },
                {
                    name: `drop`,
                    value: `Просит Антона дропнуть мем с гусём`
                },
                {
                    name: `news (:latest, :random)`,
                    value: `Просит Антона пошарить по новостным источникам`
                }
            ],
            footer: {
                text: `С любовью, ${bot.user.username} ❤️`,
            }
        }
    });
    logger.info(`${message.author.tag} used help command`);
}