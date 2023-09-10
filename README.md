# tiller
tiller is a CLI tool that is able to convert input files to .html files.

## Installation
1. Clone the repo to a local folder
2. From inside the local folder, run `npm install -g .`
## Usage
```
tiller [options] <input>
```
| Argument  | Description  
| --------  | ----------- 
| <input\> (required)     | the file or directory to convert

| Option        | Description                           |
| ------        | -----------                           |
| -o, --output <dir\> | specify the directory to write output to (default: /til) |
| -s, --stylesheet <css\> | specify a stylesheet to be used in the generated .html output |
| -v, --version | output the version number             |
| -h, --help    | display help/usage message for tiller |
 
