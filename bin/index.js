#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();

const { convertFile } = require("./convert");

program
  .name('tiller')
  .description('CLI tool for converting input files to .html')
  .version('0.1.0')
  .argument('<input>', 'specify the file or directory to be converted')
  .action((input) => {
    convertFile(input)
    .then(() => console.log(`Successfully proccessed ${input}`))
    .catch((err) => console.log(err.message));
  });

program.parse();
