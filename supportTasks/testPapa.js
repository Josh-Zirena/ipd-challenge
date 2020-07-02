const fs = require("fs");
const papa = require("papaparse");
// This is weird.. will need to see how to fix it..
const file = fs.createReadStream(`${__dirname}\\test.txt`);

let rawData = [];
papa.parse(file, {
  delimiter: "\t",
  step: function (result) {
    //console.log(result.data);
    rawData.push(result.data);
  },
});

async function test() {
  console.log("==========");
  console.log(rawData);
}

test();
