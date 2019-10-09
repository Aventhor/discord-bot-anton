let gooseMeme = require('./gooseMeme');
let replyMessage = require('./replyMessage');
let botSleep = require('./sleep');
let sys = require('./sysinfo');
let help = require('./help');

exports.sys = () => {
    sys.getInfo();
}

exports.dropMeme = (bot, channelID) => {
    gooseMeme.drop(bot, channelID);
}

exports.replyMessage = (bot, message, channelID, msg) => {
    replyMessage.reply(bot, message, channelID, msg);
}

exports.sleep = (bot, time) => {
    botSleep.sleep(bot, time);
}

exports.help = (bot, message) => {
    help.help(bot, message);
}