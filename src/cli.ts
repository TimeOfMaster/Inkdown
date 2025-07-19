#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { convert } from './convert';

(async () => {
  await yargs(hideBin(process.argv))
    .scriptName("inkdown")
    .usage('$0 <markdownFile> [options]')
    .command(
      '$0 <markdownFile>',
      'Convert a markdown file to HTML and PDF',
      (yargs) => {
        return yargs
          .positional('markdownFile', {
            describe: 'Path to the markdown file',
            type: 'string',
          })
          .option('css', {
            alias: 'c',
            describe: 'Path to a custom CSS file',
            type: 'string',
          });
      },
      async (argv) => {
        if (argv.markdownFile) {
          await convert(argv.markdownFile, argv.css);
        }
      }
    )
    .help()
    .alias('h', 'help')
    .version()
    .parse();
})();