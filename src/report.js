import {FILE_STATUS} from './constants';

// Adds a diff property to each result object, showing an increase
// or decrease in each score
function addDiffToResults(newResults, oldResults) {
    return newResults.map((newResult) => {
        const matchingOldResult = oldResults.find(
            (oldResult) => oldResult.name === newResult.name
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

// Return a new object where every key is the diff
// between the objects
function diffScores(newResult, oldResult) {
    return Object.keys(newResult).reduce((acc, key) => {
        acc[key] = newResult[key] - oldResult[key];
        return acc;
    }, {});
}

// Adds a status property to each result object, showing
// if that file was added or modified in this PR
function addFileStatusToResults(results, {added, modified}) {
    return results.map((result) => {
        const status = added.includes(result.name)
            ? FILE_STATUS.ADDED
            : modified.includes(result.name)
            ? FILE_STATUS.MODIFIED
            : null;

        return {
            ...result,
            status,
        };
    });
}

export const generateReport = ({
    newReadability,
    oldReadability,
    fileStatuses,
}) => {
    const filesWithDiff = addDiffToResults(
        newReadability.fileResults,
        oldReadability.fileResults
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
