const fs = require("fs");
const papa = require("papaparse");

function papaParse(fileName) {
	let rawData = [];
	
	return new Promise(resolve => {
		papa.parse(fileName, {
			delimiter: "\t",
			header: false,
			step: (results) => {
				rawData.push(results.data);
			},
			complete: () => {
				resolve(rawData);
			},
		});	
	})
}

async function getData(fileName) {
	const res = await papaParse(fileName);
	console.log(res);
	return res;
}

function createStream(fileName) {
    // TODO: BUG - This breaks on WINDOWS/Linux.
    return fs.createReadStream(`${__dirname}/${fileName}`);
}

const fileStream = createStream('test.txt');

getData(fileStream);



