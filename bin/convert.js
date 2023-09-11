const fs = require('fs');
const readline = require('readline');

const convertFile = async (input, outputDir, css, convertingDir = false) => {
    let paragraphs = [];
    let count = 0;
    const filestream = fs.createReadStream(input);
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

    let parsedFileName = (input.replace(/\.txt$/, ''));
    if (input.lastIndexOf('/') > -1) {
        parsedFileName = parsedFileName.slice(input.lastIndexOf('/')+1);
    }
    
    let styleTag = "";
    if (css && css.match(/\.css$/)) {
        styleTag = `<link rel='stylesheet' href=${css}>`;
    }

    if (!convertingDir) {
        clearOutput(outputDir);
    }

    fs.writeFileSync(`./${outputDir}/${parsedFileName}.html`,
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
        fs.appendFileSync(`./${outputDir}/${parsedFileName}.html`, `\n\t\t<p>${paragraph}</p>`);
    }

    fs.appendFileSync(`./${outputDir}/${parsedFileName}.html`, `\n\t</body>\n</html>`);
}

const convertDir = (input, outputDir, css) => {
    const files = fs.readdirSync(`./${input}`);
    clearOutput(outputDir);
    for (const file of files) {
        if (file.match(/\.txt$/)) {     
            convertFile(`./${input}/${file}`, outputDir, css, true)
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