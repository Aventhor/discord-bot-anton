module.exports = (bot, ...args) => {
    require('./ready')(bot, args);
    require('./messages')(bot);
    require('./directMessages')(bot, args);
    require('./guildMemberAdd')(bot);
}
