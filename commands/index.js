let gooseMeme = require('./gooseMeme');
let replyMessage = require('./replyMessage');
let botSleep = require('./sleep');
let sys = require('./sysinfo');
let help = require('./help');
const botUnsleep = require('./unsleep');

module.exports = {
    sys: () => sys.getInfo(),
    help: (bot, message) => help.help(bot, message),
    sleep: (bot, message) => botSleep.sleep(bot, message),
    unsleep: (bot, message) => botUnsleep.unsleep(bot, message),
    dropMeme: (bot, channelID) => gooseMeme.drop(bot, channelID),
    replyMessage: (bot, message, channelID, msg) => replyMessage.reply(bot, message, channelID, msg),
}