const fs = require('fs');
const XLSX = require('xlsx');

const xlsxParser = function(fileName) {
    const file = `./data/${fileName}`;

    const workbook = XLSX.readFile(file);
    const rawObjects = workbook.Sheets.Sales;
    
    let rawArray = [];
    
    for (const property in rawObjects) {
        rawArray.push(rawObjects[property]);
    }
    
    // Remove the objects we don't need from the array.
    rawArray.shift();
    rawArray.pop();
    
    let unorganizedData = [];
    
    for (const el of rawArray) {
        unorganizedData.push(el['v']);
    }
    
    const titleLength = 14;
    let titles = [];
    let body = [];
    
    let data = [];
    
    for (let i = 0; i <= titleLength-1; i++) {
        titles.push(unorganizedData[i]);
    }
    
    for (let i = 14; i < unorganizedData.length; i ++) {
        body.push(unorganizedData[i])
    }
    
    for (let i = 0; i < body.length; i+=14) {
        let textJson = `{
            "${titles[0]}" : "${body[i]}",
            "${titles[1]}": "${body[i+1]}",
            "${titles[2]}": "${body[i+2]}",
            "${titles[3]}" : "${body[i+3]}",
            "${titles[4]}" : "${body[i+4]}",
            "${titles[5]}" : "${body[i+5]}",
            "${titles[6]}" : "${body[i+6]}",
            "${titles[7]}" : "${body[i+7]}",
            "${titles[8]}" : "${body[i+8]}",
            "${titles[9]}" : "${body[i+9]}",
            "${titles[10]}" : "${body[i+10]}",
            "${titles[11]}" : "${body[i+11]}",
            "${titles[12]}" : "${body[i+12]}",
            "${titles[13]}" : "${body[i+13]}"
        }`;
    
        let obj = JSON.parse(textJson);
        data.push(obj);
    }

    // fs.appendFile('tempfile.json', JSON.stringify(data), (err) => {
    //     if (err) throw err;
    // });

    return data;
}

module.exports = xlsxParser;