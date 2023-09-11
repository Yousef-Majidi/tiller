#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();

const { convertFile, convertDir} = require("./convert");

program
  .name('tiller')
  .description('CLI tool for converting input files to .html')
  .option('-o, --output <dir>', 'specify the directory to write output to', '/til')
  .option('-s, --stylesheet <url>', 'specify a stylesheet URL to be used in the generated .html output')
  .version(`tiller 0.1.0`, '-v, --version')
  .argument('<input>', 'specify the file or directory to be converted')
  .action((input, options) => {
    if (!options.stylesheet) {
      options.stylesheet = "";
    }
    if (input.match(/\.([0-9a-z]+)(?:[?#]|$)/)) {
      if (!input.match(/\.txt$/)) {
        console.log("tiller only supports conversion of .txt files");
      } else {
        convertFile(input, options.output, options.stylesheet)
        .then(() => console.log(`Successfully proccessed ${input}`))
        .catch((err) => console.log(err.message));
      }
    } else {
      try {
        convertDir(input, options.output, options.stylesheet);
      } catch (err) {
        console.log(err.message);
      }
    }
  });

program.parse();
