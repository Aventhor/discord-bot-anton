let gooseMeme = require('./gooseMeme');
let replyMessage = require('./reply-message');
let botSleep = require('./sleep');
let sys = require('./sysinfo');

exports.sys = () => {
    sys.getInfo();
}

exports.dropMeme = (bot, channelID) => {
    gooseMeme.drop(bot, channelID);
}

exports.replyMessage = (bot, user, userID, channelID, message) => {
    replyMessage.reply(bot, user, userID, channelID, message);
}

exports.sleep = (bot, status, Statuses, args) => {
    return botSleep.sleep(bot, status, Statuses, args);
}