const fs = require('fs');
const readline = require('readline');
const path = require('path');

/*
    converts a file to .html
        input - the path of the file to convert
        outputDir - the directory to save the .html in
        css - the url of the css spreadsheet to use
        convertingDir - was convertFile called from convertDir?
*/
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
                : paragraphs[count] = line;
        } else {
            if (paragraphs[count]) {
                count++;
            }
        }
    }

    let parsedFileName = path.basename(input, '.txt');

    let styleTag = "";
    if (css && css.match(/\.css$/)) {
        styleTag = `<link rel='stylesheet' href=${css}>`;
    }

    //if convertFile was called from convertDir, the output folder is cleared in convertDir instead of here
    if (!convertingDir) {
        clearOutput(outputDir);
    }

    const fullPath = path.resolve(`${outputDir}/${parsedFileName}.html`);

    fs.writeFileSync(fullPath,
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
        fs.appendFileSync(fullPath, `\n\t\t<p>${paragraph}</p>`);
    }

    fs.appendFileSync(fullPath, `\n\t</body>\n</html>`);
}

/*
    converts all supported files in a directory to .html
        input - the directory whose contents to convert
        outputDir - the directory to save the .html in
        css - the url of the css spreadsheet to use
*/
const convertDir = (input, outputDir, css) => {
    const files = fs.readdirSync(input).filter((file) => path.extname(file) == '.txt' || path.extname(file) == '.md');
    if (files.length > 0) {
        clearOutput(outputDir);
        for (const file of files) {
            convertFile(`${input}/${file}`, outputDir, css, true)
                .then(() => console.log(`Successfully processed ${path.resolve(file)}`))
                .catch((err) => console.log(err.message));
        }
    } else {
        console.log(`${input} contains no .txt files`);
    }
}

/*
    deletes & recreates a folder
        dir - the folder to recreate
*/
const clearOutput = (dir) => {
    if (fs.existsSync(`${dir}`)) {
        fs.rmSync(`${dir}`, { recursive: true, force: true });
    }
    fs.mkdirSync(`${dir}`);
}

/*
    given a path, convert the file or directory to .html
        input - the path specified by the user
        options - arguments passed with options (e.g. -o <dir>, -s <url>)
            (see: https://www.npmjs.com/package/commander#options)
*/
const processFile = (input, options) => {
    if (fs.statSync(`${input}`).isFile()) {
        if (path.extname(input) != '.txt' && path.extname(input) != '.md') {
            throw new Error("tiller only supports conversion of .txt and .md files");
        } else {
            convertFile(input, options.output, options.stylesheet)
                .then(() => console.log(`Successfully processed ${path.resolve(input)}`))
                .catch((err) => console.log(err.message));
        }
    } else {
        convertDir(input, options.output, options.stylesheet);
    }
}

module.exports.processFile = processFile;