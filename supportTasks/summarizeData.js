const fs = require('fs');
const file = './tempfile.json';

const readFile = function() {
    return new Promise ((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) reject('Error. Could not read file.')
            else resolve(JSON.parse(data));
        })
    })
}

async function summarizeData(category, year, month) {
    const data = await readFile();
    const date = `${year}-${month}`;

    let selectedData = [];

    // If category matches push into a new array.
    data.forEach((transaction, i) => {
        if (transaction.Section === category &&
            (Object.keys(transaction).includes(`${date} Units`) || (Object.keys(transaction).includes(`${date} Gross Sales`)))) {
            selectedData.push(transaction);
        }
    });

    let totalUnits = 0;
    let totalGrossSales = 0;

    // If we have data in our array, show results.
    if (selectedData.length > 0) {
        selectedData.forEach(selectedCategory => {

            totalUnits += parseInt(selectedCategory[`${year}-${month} Units`]);
            totalGrossSales += parseInt(selectedCategory[`${year}-${month} Gross Sales`]);
        });
        console.log(`${category} - Total Units: ${totalUnits}, Total Gross Sales - $${totalGrossSales}`);
    } else {
        console.log('No data available.');
    }
}



module.exports = summarizeData;