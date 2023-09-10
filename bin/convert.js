const fs = require('fs');
const readline = require('readline');

const convertFile = async (path, dir) => {
    let paragraphs = [];
    let count = 0;
    if (path.search(/\.txt$/) == -1) {
        throw new Error("tiller only supports conversion of .txt files.");
    }
    const filestream = fs.createReadStream(path);
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

    let parsedFileName = (path.replace(/\.txt$/, ''));
    if (path.lastIndexOf('/') > -1) {
        parsedFileName = parsedFileName.slice(path.lastIndexOf('/'));
    }

    if (fs.existsSync(`./${dir}`)) {
        fs.rmSync(`./${dir}`, {recursive: true, force: true});
    }
    fs.mkdirSync(`./${dir}`);
    fs.writeFileSync(`./${dir}/${parsedFileName}.html`,
    `<!doctype html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>${parsedFileName}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>`);
    for (const paragraph of paragraphs) {
        fs.appendFileSync(`./${dir}/${parsedFileName}.html`, `\n\t\t<p>${paragraph}</p>`);
    }
    fs.appendFileSync(`./${dir}/${parsedFileName}.html`, `\n\t</body>\n</html>`);
}

module.exports.convertFile = convertFile;