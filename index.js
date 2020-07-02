const readline = require('readline');

 
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
    if (!file) {
        console.log('Please enter a file name.');
        rl.prompt();
    } else {
        console.log(`Searching for ${file}`);
        rl.prompt();
    }
    // console.log(`Searching for file ${file}`);
    // rl.prompt();
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
