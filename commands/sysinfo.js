const si = require('systeminformation');

exports.getInfo = () => {
    si.osInfo()
        .then(data => console.log(data))
        .catch(error => console.error(error));

    si.cpu()
        .then(data => console.log(data))
        .catch(error => console.error(error));

}
