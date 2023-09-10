const fs = require('fs');
const readline = require('readline');

const convertFile = async (filename, dir) => {
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
                :  paragraphs[count] = line;
        } else {
            if (paragraphs[count]) {
                count++;
            }
        }
    }

    console.log(`Write to: ${dir}`);
    
    if (fs.existsSync(`./${dir}`)) {
        fs.rmSync(`./${dir}`, {recursive: true}, );
    }
    fs.mkdirSync(`./${dir}`);

    for (const paragraph of paragraphs) {
        fs.appendFileSync(`./${dir}/${filename}.html`, `<p>${paragraph}</p>`, err => {
            if (err) {
                throw new Error(err.message);
            }
        });
    }
}

module.exports.convertFile = convertFile;