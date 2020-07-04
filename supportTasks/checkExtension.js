//const papaParse = require('./testPapa');

module.exports = function(file) {
    const ext = file.split('.')[1];
    if (ext === 'xlsx' || ext === 'txt') {
        return true;
    } else {
        return false;
    }
};
