const papaParseData = require('./papaParse');
const xlsxParser = require('./xlsxParser');

const processData = async function(file) {
    const ext = file.split('.')[1];
    
    switch (ext) {
        case 'txt':
            await papaParseData(file);
            break;
        case 'xlsx':
            await xlsxParser(file);
            break;
        default:
            throw console.error('ERROR: something went wrong');
    }
};

module.exports = processData;