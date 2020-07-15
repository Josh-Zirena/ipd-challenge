const fs = require("fs");
const papa = require("papaparse");

function papaParse(fileName) {
	let rawData = [];
	
	return new Promise(resolve => {
		papa.parse(fileName, {
			delimiter: "\t",
			header: true,
			step: (results) => {
				rawData.push(results.data);
			},
			complete: () => {
				resolve(rawData);
            },
            error: () => {
                throw new Error('Error. Papa parse could not parse this file.');
			},
		});	
	})
}

function createStream(fileName) {
    // TODO: BUG - This may break on WINDOWS/Linux.
    return fs.createReadStream(`./data/${fileName}`);
}

const getData = async function (fileName) {
	const fileStream = createStream(fileName);
	return await papaParse(fileStream);
}

module.exports = getData;