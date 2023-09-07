import path from 'path';
import glob from 'glob';
import {Command} from 'commander';
import {calculateReadability} from '../readability-files';
import {generateReport} from '../report';
import {reportToComment} from '../markdown';

const program = new Command();
program.name('report').description('Show generated report output in console');

program
    .argument('<oldFolder>', 'old folder to compare to')
    .argument('<newFolder>', 'new folder to compare to')
    .option(
        '-g, --glob <pattern>',
        'The glob to use when matching files',
        '**/*.{md,mdx}',
    );
program.parse();

const GLOB = program.opts().glob;
const [, , oldFolder, newFolder] = process.argv;

const ROOT_DIR = process.cwd();

// Run the readability stats on all MD files in the first folder provided
process.chdir(path.join(ROOT_DIR, oldFolder));
const allOldFiles = glob.sync(GLOB);
const oldReadability = calculateReadability(GLOB);

// Run the readability stats on all MD files in the second folder provided
process.chdir(path.join(ROOT_DIR, newFolder));
const allNewFiles = glob.sync(GLOB);
const newReadability = calculateReadability(GLOB);

// We dont have a real PR, so generate modified/added files based
// on the difference of files in the input folders
const fileStatuses = {
    added: allNewFiles.filter((filepath) => !allOldFiles.includes(filepath)),
    modified: allNewFiles.filter((filepath) => allOldFiles.includes(filepath)),
    renamed: [],
};

const report = generateReport(newReadability, oldReadability, fileStatuses);
const comment = reportToComment(report);

console.log(comment);
