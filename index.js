const readline = require('readline');
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

    // The file extension must be .xlsx or .txt.
    if (!checkFileExt(file)) {
        rl.prompt();
    } else {
        // loadFile? processFile? parseFile?
        console.log(`Processing ${file}....`);
    }
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
