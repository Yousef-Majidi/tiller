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
        fs.rmSync(`./${dir}`, {recursive: true, force: true});
    }
    fs.mkdirSync(`./${dir}`);
    fs.writeFileSync(`./${dir}/${filename}.html`,
    `<!doctype html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>${filename}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>`);
    for (const paragraph of paragraphs) {
        fs.appendFileSync(`./${dir}/${filename}.html`, `\n\t\t<p>${paragraph}</p>`);
    }
    fs.appendFileSync(`./${dir}/${filename}.html`, `\n\t</body>\n</html>`);
}

module.exports.convertFile = convertFile;