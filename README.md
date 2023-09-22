# tiller

tiller is a CLI tool that is able to convert input files to .html files.
At the moment, only .txt and .md files are supported.
At the moment, only the italic formatting is supported for markdown files.
If a directory is used as input, tiller will find and convert all the .txt and .md files in that directory.

## Installation

node and npm must be installed.

1. `git clone https://github.com/rook4715/tiller.git`
2. `cd tiller`
3. `npm install`
4. `npm install -g .`

## Usage

**tiller will delete and recreate the output folder on each run to ensure that the output is always up to date. Move or back up any files you wish to keep between uses.**

```
tiller [options] <input>
```

| Argument            | Description                      |
| ------------------- | -------------------------------- |
| <input\> (required) | the file or directory to convert |

| Option                  | Description                                                       |
| ----------------------- | ----------------------------------------------------------------- |
| -o, --output <dir\>     | specify the directory to write output to (default: til)           |
| -s, --stylesheet <url\> | specify a stylesheet url to be used in the generated .html output |
| -v, --version           | output the version number                                         |
| -h, --help              | display help/usage message for tiller                             |

### Example usage

`tiller file.txt`

or

`tiller file.md`

`tiller -o til2 file.txt`

or

`tiller --output til2 file.md`

`tiller -s https://cdn.jsdelivr.net/npm/water.css@2/out/water.css file.txt`

## License

[GPL 3.0](https://github.com/rook4715/tiller/blob/main/LICENSE)
