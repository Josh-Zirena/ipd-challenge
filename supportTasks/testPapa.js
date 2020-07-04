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
                console.error('Error. Could not parse this file.');
			},
		});	
	})
}

function createStream(fileName) {
    // TODO: BUG - This may break on WINDOWS/Linux.
    return fs.createReadStream(`${__dirname}/${fileName}`);
}

const processData = async function (fileName) {
	const fileStream = createStream(fileName);
	let rawData = await papaParse(fileStream)
	return rawData;
}

module.exports = processData;