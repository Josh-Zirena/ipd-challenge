const readline = require('readline');
const fileExists = require('./supportTasks/fileExists')
const checkExtension = require('./supportTasks/checkExtension');
const processData = require('./supportTasks/testPapa');
 
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

const ingest = async function (file) {

    /** Check if the file exists and the extension is valid. */
    if (fileExists(file) && checkExtension(file)) {
        const data = await processData(file);
        // BUG: Having a hard time to get papa parse to return an error.
        // TODO: Do something with the parsed data.
        console.log('Success');
        rl.prompt();
    } else if (!fileExists(file)) {
        console.log(`Could not find: ${file}.`);
        rl.prompt();
    } else if (!checkExtension(file)) {
        console.log('Can only process files with extensions ending in .txt or .xlsx');
        rl.prompt();
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
