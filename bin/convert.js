const fs = require('fs');
const readline = require('readline');

const convertFile = async (filename) => {
    const filestream = fs.createReadStream(filename);
    const rline = readline.createInterface({
        input: filestream,
        crlfDelay: Infinity,
    });

    for await (const line of rline) {
        console.log(`Line: ${line}`);
    }
}

module.exports.convertFile = convertFile;