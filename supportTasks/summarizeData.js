const fs = require('fs');

const file = './tempFile.json';

const readFile = function() {
    return new Promise ((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) reject('Error. Could not read file.')
            else resolve(JSON.parse(data));
        })
    })
}

async function summarizeData(category = 'International', year= '2018', month='12') {
    const data = await readFile();

    const date = `${year}-${month}`;
    let totalUnits = 0;
    let totalGrossSales = 0;

    for (let transaction of data) {
        if (transaction['Section'] === category) {
            // Add the units
            totalUnits += parseInt(transaction[`${date} Units`]);
            totalGrossSales += parseInt(transaction[`${date} Gross Sales`]);
        }
    }

    console.log(`${category} - Total Units: ${totalUnits}, Total Gross Sales - $${totalGrossSales}`);
}



module.exports = summarizeData;