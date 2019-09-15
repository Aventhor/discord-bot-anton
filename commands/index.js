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

exports.replyMessage = (bot, user, userID, channelID, message) => {
    replyMessage.reply(bot, user, userID, channelID, message);
}

exports.sleep = (bot, time) => {
    botSleep.sleep(bot, time);
}

exports.help = (bot, user, channelID) => {
    help.help(bot, user, channelID);
}