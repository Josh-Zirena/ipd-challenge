const fs = require('fs');
const readline = require('readline');

const fileExists = require('./supportTasks/fileExists')
const checkExtension = require('./supportTasks/checkExtension');
const { parseData, handleDuplicateSKUs } = require('./supportTasks/processData');
const summarizeData = require('./supportTasks/summarizeData');
 
const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '>>> '
});

// TODO: Move this out of index.js
const deleteTemp = function() {
    fs.unlink('./tempfile.json', (err) => {
        if (err) console.log('Could not delete tempfile.json.');
    });
};

const exit = function () {
    // TODO: Create a test here..
    deleteTemp();
    rl.close();
};

const ingest = async function (file) {
    deleteTemp();
    /** Check if the file exists and the extension is valid. */
    if (fileExists(file) && checkExtension(file)) {

        try {
            const rawData = await parseData(file);
            handleDuplicateSKUs(rawData);
            console.log('Success');
        } catch (err) {
            console.log('Error');
        }
        
        rl.prompt();
    } else if (!fileExists(file)) {
        console.log(`Could not find: ${file}.`);
        rl.prompt();
    } else if (!checkExtension(file)) {
        console.log('Can only process files with extensions ending in .txt or .xlsx');
        rl.prompt();
    }
}

const summary = async function (category, year, month) {
    await summarizeData(category, year, month);
    rl.prompt();
}

let commands = {
    exit: exit,
    ingest: ingest,
    summary: summary,
};

console.log('=== IDP Analytics Coding Challenge ===')
rl.prompt();

rl.on('line', (userInput) => {
    // Split up the command from the arguments.
    const command = userInput.split(' ')[0].toLocaleLowerCase();
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
