#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();

const { convertFile } = require("./convert");

program
  .name('tiller')
  .description('CLI tool for converting input files to .html')
  .option('-o, --output <dir>', 'specify the directory to write output to', '/til')
  .version(`tiller 0.1.0`, '-v, --version')
  .argument('<input>', 'specify the file or directory to be converted')
  .action((input, options) => {
    convertFile(input, options.output)
    .then(() => console.log(`Successfully proccessed ${input}`))
    .catch((err) => console.log(err.message));
  });

program.parse();
