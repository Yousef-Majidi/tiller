const fs = require('fs');
const readline = require('readline');

const convertFile = async (path, dir, css) => {
    let paragraphs = [];
    let count = 0;
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

    let parsedFileName = (path.replace(/\.txt$/, ''));
    if (path.lastIndexOf('/') > -1) {
        parsedFileName = parsedFileName.slice(path.lastIndexOf('/'));
    }
    
    const styleTag = css.search(/\.css$/) > -1 ? `<link rel='stylesheet' href=${css}>` : "";

    fs.writeFileSync(`./${dir}/${parsedFileName}.html`,
    `<!doctype html>
    <html lang="en">
    <head>
        ${styleTag}
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

const convertDir = (dirName, outputDir, css) => {
    const files = fs.readdirSync(`./${dirName}`);
    clearOutput(outputDir);
    for (const file of files) {
        if (file.search(/\.txt$/) > -1) {     
            convertFile(`./${dirName}/${file}`, outputDir, css)
            .then(() => console.log(`Successfully proccessed ${file}`))
            .catch((err) => console.log(err.message));
        }
    }
}

const clearOutput = (dir) => {
    if (fs.existsSync(`./${dir}`)) {
        fs.rmSync(`./${dir}`, {recursive: true, force: true});
    }
    fs.mkdirSync(`./${dir}`);
}

module.exports.convertFile = convertFile;
module.exports.convertDir = convertDir;
module.exports.clearOutput = clearOutput;