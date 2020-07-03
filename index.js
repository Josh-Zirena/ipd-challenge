const readline = require('readline');
const fileExists = require('./supportTasks/fileExists')
const checkFileExt = require('./supportTasks/validFile');
 
const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '>> '
});

const pwdTest = function () {
    console.log(process.cwd());
    rl.prompt();
}

const exit = function () {
    rl.close();
}

const ingest = function (file) {

    // Check if file exists in the directory.
    
    if (fileExists(file)) {
        console.log('Found your file!');
        rl.close();
    } else {
        console.log(`Could not find your file. ${file}`);
        rl.prompt();
    }

    // The file extension must be .xlsx or .txt.
    // if (!checkFileExt(file)) {
    //     rl.prompt();
    // } else {
    //     // loadFile? processFile? parseFile?
    //     console.log(`Processing ${file}....`);
    // }
}

let commands = {
    pwd: pwdTest,
    exit: exit,
    ingest: ingest,
};

console.log('=== IDP Analytics Coding Challenge ===')
rl.prompt();

rl.on('line', (userInput) => {
    userInput = userInput.toLowerCase();
    // isolate the first part of the request.
    let command = userInput.split(' ')[0];
    let arg1 = userInput.split(' ')[1] || '';
    let arg2 = userInput.split(' ')[2] || '';

    if (command in commands) {
        commands[command](arg1, arg2);
    } else {
        console.log(`Unknown command: ${command}\nExiting..\n`);
        rl.close();
    }
});
