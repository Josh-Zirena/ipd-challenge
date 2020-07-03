const fs = require('fs');



const checkIfFileExists = function(fileName) {
    //const fileName = ('test.txt');
    const file = `${__dirname}/${fileName}`

    fs.access(file, fs.constants.F_OK, (err) => {
        if (err) {
            //console.log(`Could not find:  *${file}*`);
            return false;
        } else {
            console.log('==============');
            console.log(`found ${file}`);
            return true;
        }

    });
}

module.exports = checkIfFileExists;