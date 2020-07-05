const fs = require('fs');
const readline = require('readline');

const fileExists = require('./supportTasks/fileExists')
const checkExtension = require('./supportTasks/checkExtension');
const processData = require('./supportTasks/processData');
const parseData = require('./supportTasks/papaParse');
const summarizeData = require('./supportTasks/summarizeData');
 
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
    // TODO: Create a test here..
    fs.unlink('./tempFile.json', (err) => {
        if (err) console.log('Could not delete tempFile.json.');
    });
    rl.close();
}

const ingest = async function (file) {
    /** Check if the file exists and the extension is valid. */
    if (fileExists(file) && checkExtension(file)) {
        processData(file);
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

const summary = async function (file) {
    summarizeData();
    rl.close();
}

let commands = {
    pwd: pwdTest,
    exit: exit,
    ingest: ingest,
    summary: summary,
};

console.log('=== IDP Analytics Coding Challenge ===')
rl.prompt();

rl.on('line', (userInput) => {
    // BUG: file names must be case sensitive.
    userInput = userInput.toLowerCase();
    
    // Split up the command from the arguments.
    const command = userInput.split(' ')[0];
    const arg1 = userInput.split(' ')[1] || '';
    const arg2 = userInput.split(' ')[2] || '';
    const arg3 = userInput.split(' ')[3] || '';


    if (command in commands) {
        commands[command](arg1, arg2, arg3);
    } else {
        console.log(`Unknown command: ${command}\nExiting..\n`);
        rl.close();
    }
});
