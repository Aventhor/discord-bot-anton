module.exports = (bot, ...[timer]) => {
    require('./ready')(bot, timer);
    require('./messages')(bot);
    require('./directMessages')(bot, timer);
    require('./guildMemberAdd')(bot);
}
