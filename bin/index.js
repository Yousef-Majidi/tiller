#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();

const { processFile } = require("./convert");

program
  .name('tiller')
  .description('CLI tool for converting input files to .html')
  .option('-o, --output <dir>', 'specify the directory to write output to', 'til')
  .option('-s, --stylesheet <url>', 'specify a stylesheet URL to be used in the generated .html output')
  .version(`tiller 0.1.0`, '-v, --version')
  .argument('<input>', 'specify the file or directory to be converted')
  .action((input, options) => {
    try {
      processFile(input, options);
    } catch (err) {
      console.log(err.message);
    }
  });

program.parse();
