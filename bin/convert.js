const fs = require('fs');
const readline = require('readline');

const convertFile = async (filename) => {
    let paragraphs = [];
    let count = 0;

    const filestream = fs.createReadStream(filename);
    const rline = readline.createInterface({
        input: filestream,
        crlfDelay: Infinity,
    });

    for await (const line of rline) {
        if (line.length > 0) {
            paragraphs[count] ? 
                paragraphs[count] += (' ' + line)
                :  paragraphs[count] = line
        } else {
            if (paragraphs[count])
                count++;
        }
    }

    console.log('Output:');
    for (const paragraph of paragraphs) {
        console.log(`<p>${paragraph}</p>`);
    }
}

module.exports.convertFile = convertFile;