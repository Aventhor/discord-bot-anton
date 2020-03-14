let gooseMeme = require('./gooseMeme');
let replyMessage = require('./replyMessage');
let botSleep = require('./sleep');
let sys = require('./sysinfo');
let help = require('./help');
const botUnsleep = require('./unsleep');

exports.sys = () => {
    sys.getInfo();
}

exports.dropMeme = (bot, channelID) => {
    gooseMeme.drop(bot, channelID);
}

exports.replyMessage = (bot, message, channelID, msg) => {
    replyMessage.reply(bot, message, channelID, msg);
}

exports.help = (bot, message) => {
    help.help(bot, message);
}

module.exports = {
    sleep: (bot, message) => botSleep.sleep(bot, message),
    unsleep: (bot, message) => botUnsleep.unsleep(bot, message),
}