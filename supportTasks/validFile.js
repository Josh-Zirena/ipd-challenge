//const papaParse = require('./testPapa');

module.exports = function(file) {
    const ext = file.split('.')[1];
    if (ext === 'xlsx' || ext === 'txt') {
        // const data = papaParse;
        //console.log(data);
        return true;
    } else {
        console.log('Cannot process this file extension.\nPlease try again.');
        return false;
    }
};
