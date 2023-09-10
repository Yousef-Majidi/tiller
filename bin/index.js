#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();

const { convertFile, convertDir, clearOutput } = require("./convert");

program
  .name('tiller')
  .description('CLI tool for converting input files to .html')
  .option('-o, --output <dir>', 'specify the directory to write output to', '/til')
  .version(`tiller 0.1.0`, '-v, --version')
  .argument('<input>', 'specify the file or directory to be converted')
  .action((input, options) => {
    if (input.search(/\.([0-9a-z]+)(?:[?#]|$)/) > -1) {
      if (input.search(/\.txt$/) == -1) {
        console.log("tiller only supports conversion of .txt files");
      } else {
        clearOutput(options.output);
        convertFile(input, options.output)
        .then(() => console.log(`Successfully proccessed ${input}`))
        .catch((err) => console.log(err.message));
      }
    } else {
      try {
        convertDir(input, options.output);
      } catch (err) {
        console.log(err.message);
      }
    }
  });

program.parse();
