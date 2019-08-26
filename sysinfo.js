const si = require('systeminformation');

var getInfo = function getInfo() {
    si.osInfo()
        .then(data => console.log(data))
        .catch(error => console.error(error));

    si.cpu()
        .then(data => console.log(data))
        .catch(error => console.error(error));

}
module.exports.getInfo = getInfo;
