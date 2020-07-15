const fs = require('fs');
const papaParseData = require('./papaParse');
const xlsxParser = require('./xlsxParser');

const saveToFile = function(data) {
    fs.appendFile('tempfile.json', JSON.stringify(data), (err) => {
        if (err) throw err;
    });
}

const parseData = async function(file) {
    const ext = file.split('.')[1];
    
    switch (ext) {
        case 'txt':
            return await papaParseData(file);
            break;
        case 'xlsx':
            return await xlsxParser(file);
            break;
        default:
            throw console.error('ERROR: something went wrong');
    }
};

const handleDuplicateSKUs = function(rawData) {
    const unitsRegx = /^\d{4}-\d{1,2} Units$/i;
    const salesRegx = /^(?<year>\d{4})-(?<month>\d{1,2}) Gross Sales$/i;
    const SKUMap = new Map();
    const SKUMapGroupped = new Map();

    // Grouping by SKU
    // { <SKU>: [items] }
    rawData.forEach((item) => {
        if (SKUMap.has(item.SKU)) {
            SKUMap.set(item.SKU, [...SKUMap.get(item.SKU), item]);
        } else {
            SKUMap.set(item.SKU, [item]);
        }
    });

    console.log(SKUMap);

    // Merging units and sales
    [...SKUMap].forEach(([SKU, items]) => {
    const max = {
        highestSection: '',
        highestSale: 0,
        highestWeight: 0,
    };

    SKUMapGroupped.set(SKU, {});

    items.forEach((item) => {
        Object.keys(item).forEach((key) => {
        if (unitsRegx.test(key)) {
            const units = Number.parseInt(item[key], 10);

            SKUMapGroupped.set(SKU, { 
            ...SKUMapGroupped.get(SKU),
            [key]: SKUMapGroupped.get(SKU).hasOwnProperty(key) ? SKUMapGroupped.get(SKU)[key] + units : units,
            });
        } else if (salesRegx.test(key)) {
            const { groups: { year, month } } = key.match(salesRegx);
            const weight = (Number.parseInt(year, 10) * 12) + Number.parseInt(month, 10);
            const sales = Number.parseFloat(item[key]);
            const isLatestMonth = weight === max.highestWeight && sales > max.highestSale;

            if (weight > max.highestWeight || isLatestMonth) {
            max.highestSale = sales;
            max.highestSection = item.Section;
            max.highestWeight = weight;
            }

            SKUMapGroupped.set(SKU, {
            ...SKUMapGroupped.get(SKU),
            [key]: SKUMapGroupped.get(SKU).hasOwnProperty(key) ? SKUMapGroupped.get(SKU)[key] + sales : sales,
            });
        }
        });
    });

    SKUMapGroupped.set(SKU, {
        SKU,
        Section: max.highestSection,
        ...SKUMapGroupped.get(SKU),
    });
    });

    const final = [...SKUMapGroupped].map(([_, mergedItem]) => mergedItem);

    saveToFile(final);
};



module.exports = { parseData, handleDuplicateSKUs};