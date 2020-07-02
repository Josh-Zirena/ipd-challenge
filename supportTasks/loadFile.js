const fs = require('fs');

const lookupFile = function(file) {
    fs.readFile(__dirname + '/' + file, (err, data) => {
        if (err) throw err;
        console.log(data.toString());
    })
}

lookupFile('test.txt');