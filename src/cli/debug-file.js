import {Command} from 'commander';
import fs from 'fs';
import {preprocessMarkdown} from '../readability'

const program = new Command();
program
  .name('debug file')
  .description('Show what the program parses from a single file, after stripping the junk away')

program
  .argument('<file>', 'the filepath to show the stripped input for')
program.parse();

const [, , filePath] = process.argv;

const markdown = fs.readFileSync(filePath);
const stripped = preprocessMarkdown(markdown);

console.log('------ stripped file input: ------');
console.log(stripped);
