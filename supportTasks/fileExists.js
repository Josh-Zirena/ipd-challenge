const fs = require('fs');

const checkIfFileExists = function (fileName) {
    const file = `${__dirname}/${fileName}`;

    try {
        fs.accessSync(file, fs.constants.F_OK)
        return true;
    } catch (err) {
        return false;
    }
}

module.exports = checkIfFileExists;
