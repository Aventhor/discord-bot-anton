let redditLinks = require('../db.json')
const { get } = require('snekfetch');
let logger = require('../helpers/logger');

exports.drop = async (bot, channelID) => {
    let randomLink = Math.floor(Math.random() * redditLinks.redditLinks.length)
    const { body } = await get(redditLinks.redditLinks[randomLink].url).query({ limit: 1000 });
    let meme;
    if (body[0]) {
        meme = body[0].data.children[Math.floor(Math.random() * body[0].data.children.length)].data;
    } else {
        meme = body.data.children[Math.floor(Math.random() * body.data.children.length)].data;
    }

    if (typeof channelID !== 'string') {
        channelID = channelID.channel.id;
    }

    logger.info(`fetched data=${meme.url}`);
    if (meme.url != null) {
        bot.channels.cache.get(channelID).send({
            embed: {
                color: 0xFF57B1,
                author: {
                    name: `${bot.user.username} dropped the goose`,
                    icon_url: 'https://cdn.discordapp.com/app-icons/575742784095518723/87ac88ba0168f4e6a50cd7218fc48556.png'
                },
                image: {
                    url: meme.url
                },
                timestamp: new Date(),
                footer: {
                    text: `by ${meme.subreddit_name_prefixed}`
                },
            }
        });
        logger.info(`bot sended goose picture to ${channelID}`)
    }
    else {
        logger.info(`error on fetching data: ${meme.url}`)
        message.author.send(`Ой, что-то пошло не так... n\Попробуйте еще раз`);
    }
}

