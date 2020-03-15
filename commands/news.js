const { get } = require('snekfetch');
const logger = require('../helpers/logger');

const NEWS_TYPES = {
    LATEST: 'latest',
    RANDOM: 'random'
}

async function getNews(type) {
    const response = await get(`http://newsapi.org/v2/top-headlines?country=ru&apiKey=${process.env.NEWS_API_KEY}&pageSize=${type === NEWS_TYPES.LATEST ? 1 : 50}`);
    if (type === NEWS_TYPES.LATEST)
        return response.body.articles[0];
    if (type === NEWS_TYPES.RANDOM) {
        const randomPost = Math.floor(Math.random() * response.body.articles.length)
        return response.body.articles[randomPost];
    }
}

/** 
    *@param {string} newsType - one of this values: latest, random
 */
async function sendNews(bot, message, { newsType: type }) {
    const news = await getNews(type);
    const channelId = typeof message !== 'string' ? message.channel.id : message;

    bot.channels.cache.get(channelId).send({
        embed: {
            color: 0xededed,
            title: news.title,
            description: news.description,
            author: {
                name: `${bot.user.username} dropped the news`,
                icon_url: 'https://cdn.discordapp.com/app-icons/575742784095518723/87ac88ba0168f4e6a50cd7218fc48556.png'
            },
            fields: [{
                name: "Источник",
                value: news.url
            }],
            image: {
                url: news.urlToImage
            },
            timestamp: new Date(news.publishedAt),
            footer: {
                text: `Published At:`
            },
        }
    });
    logger.info(`bot sended news post to ${message.channel.recipient.username} with channel id: ${channelId}`)
}

module.exports.sendNews = sendNews;
