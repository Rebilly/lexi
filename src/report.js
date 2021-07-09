import {FILE_STATUS} from './constants';

// Return a new object where every key is the diff
// between the objects. For example:
// diffScores({a: 1, b: 10}, {a: 3, b:10})
// returns: {a:2, b:0}
function diffScores(newResult, oldResult) {
    return Object.keys(newResult).reduce((acc, key) => {
        acc[key] = newResult[key] - oldResult[key];
        return acc;
    }, {});
}

// Adds a diff property to each result object, showing an increase
// or decrease in each score
function addDiffToResults(newResults, oldResults, renamedFiles = []) {
    return newResults.map((newResult) => {
        const oldName =
            renamedFiles.find((file) => file.to === newResult.name)?.from ??
            newResult.name;

        const matchingOldResult = oldResults.find(
            (oldResult) => oldResult.name === oldName
        );

        const diff = matchingOldResult
            ? diffScores(newResult.scores, matchingOldResult.scores)
            : null;

        return {
            ...newResult,
            diff,
        };
    });
}

// Adds a status property to each result object, showing
// if that file was added or modified in this PR
function addFileStatusToResults(results, {added, modified}) {
    return results.map((result) => {
        let status = null;
        if (added.includes(result.name)) {
            status = FILE_STATUS.ADDED;
        } else if (modified.includes(result.name)) {
            status = FILE_STATUS.MODIFIED;
        }

        return {
            ...result,
            status,
        };
    });
}

// Creates a report object using the old and new readability
// scores and files statuses. The report has extra details such
// as the difference between the old and the new values.
export const generateReport = ({
    newReadability,
    oldReadability,
    fileStatuses,
}) => {
    const filesWithDiff = addDiffToResults(
        newReadability.fileResults,
        oldReadability.fileResults,
        fileStatuses.renamed
    );
    const filesWithStatuses = addFileStatusToResults(
        filesWithDiff,
        fileStatuses
    );
    const onlyTouchedFiles = filesWithStatuses.filter(
        (result) => result.status !== null
    );

    return {
        fileResults: onlyTouchedFiles,
        averageResult: addDiffToResults(
            newReadability.averageResult,
            oldReadability.averageResult
        ),
    };
};
