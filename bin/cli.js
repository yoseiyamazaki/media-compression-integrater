#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { run } = require('../src/index');
const { saveConfig, defaultConfig, DEFAULT_CONFIG_FILENAME } = require('../src/config');

yargs(hideBin(process.argv))
  .command(
    '$0 [input]', // Changed to optional
    'Compress images and videos in a file or directory',
    (yargs) => {
      return yargs
        .positional('input', {
          describe: 'Path to the input file or directory. Defaults to the current directory.',
          type: 'string',
          default: '.', // Default to current directory
        })
        .option('profile', {
          alias: 'p',
          type: 'string',
          description: 'The compression profile to use. If omitted, all profiles will be run.',
          // demandOption is removed
        });
    },
    (argv) => {
      run(argv.input, argv).catch(console.error);
    }
  )
  .command(
    'init',
    'Create a default configuration file',
    (yargs) => {
        return yargs.option('file', {
            alias: 'f',
            type: 'string',
            description: 'Name of the configuration file to create',
            default: DEFAULT_CONFIG_FILENAME
        });
    },
    (argv) => {
      saveConfig(defaultConfig, argv.file).catch(console.error);
    }
  )
  .option('output', {
    alias: 'o',
    type: 'string',
    description: 'Output directory for compressed files. Defaults to the same location as the input file.',
  })
  .option('config', {
    alias: 'c',
    type: 'string',
    description: `Path to configuration file (default: ${DEFAULT_CONFIG_FILENAME})`,
  })
  .help()
  .alias('help', 'h')
  .parse();
