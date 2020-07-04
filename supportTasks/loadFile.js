// TODO:  I think this should basically just check if the file exists and
// can be processed. Maybe just return true or false?

const fs = require('fs');


const lookupFile = function(file) {
    fs.readFile(__dirname + '/' + file, (err, data) => {
        if (err) throw err;
        else {
            console.log(data.toString());
        }
        
    })
}

lookupFile('test.txt');