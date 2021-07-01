import path from 'path';
import glob from 'glob';
import {calculateReadability} from './readability';
import {generateReport} from './report';
import {reportToComment} from './markdown';

const [, , oldFolder, newFolder] = process.argv;

const ALL_MD_FILES = '**/*.md';
const ROOT_DIR = process.cwd();

process.chdir(path.join(ROOT_DIR, oldFolder));
const allOldFiles = glob.sync(ALL_MD_FILES);
const oldReadability = calculateReadability(ALL_MD_FILES);

process.chdir(path.join(ROOT_DIR, newFolder));
const allNewFiles = glob.sync(ALL_MD_FILES);
const newReadability = calculateReadability(ALL_MD_FILES);

// We dont have a real PR, so generate modified/added files based
// on the input paths.
const fileStatuses = {
    added: allNewFiles.filter((filepath) => !allOldFiles.includes(filepath)),
    modified: allNewFiles.filter((filepath) => allOldFiles.includes(filepath)),
};

const report = generateReport({newReadability, oldReadability, fileStatuses});
const comment = reportToComment({report});

console.log(comment);
