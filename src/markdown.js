import path from 'path';

const arrayToCells = (array) => `${array.join(' | ')}\n`;

const tableToMD = ({headers, rows}) => {
    let table = arrayToCells(headers);
    table += arrayToCells(Array.from({length: headers.length}, () => '---'));
    table += rows.map((row) => arrayToCells(row)).join('');

    return table;
};

// Round a number to 2 decimal places, but return a float
// so that trailing 0's will not be stringified
const roundValue = (value) => {
    if (typeof value !== 'undefined') {
        return parseFloat(value.toFixed(2));
    }
    return value;
};

// Adds an emoji marker to a value.
// If the value is POSITIVE, we consider it a good value
// and add a positive marker, otherwise a negative marker
const addPositiveDiffMarker = (value) => {
    if (typeof value !== 'undefined') {
        if (value === 0 || value > 0) {
            return `🟢 +${value}`;
        }
        return `🔴 ${value}`;
    }
    return value;
};

// Adds an emoji marker to a value.
// If the value is NEGATIVE, we consider it a good value
// and add a positive marker, otherwise a negative marker
const addNegativeDiffMarker = (value) => {
    if (typeof value !== 'undefined') {
        if (value === 0 || value < 0) {
            return `🟢 ${value}`;
        }
        return `🔴 +${value}`;
    }
    return value;
};

// Returns a table row showing the absolute scores for a given result object.
// If a nameToLinkFunction is passed, the result name will be created
// as link, using the result of that function as the target
const resultToScoreTableRow = (result, nameToLinkFunction) => {
    const {name, scores} = result;
    const filenameOnly = path.basename(name);
    const displayName = nameToLinkFunction
        ? `[${filenameOnly}](${nameToLinkFunction(name)} "${name}")`
        : name;

    return [
        displayName,
        roundValue(scores.fleschReadingEase),
        roundValue(scores.gunningFog),
        roundValue(scores.smogIndex),
        roundValue(scores.automatedReadabilityIndex),
        roundValue(scores.colemanLiauIndex),
        roundValue(scores.linsearWriteFormula),
        roundValue(scores.daleChallReadabilityScore),
    ];
};

// Returns a table row showing the difference in scores for a given result object.
const resultToDiffTableRow = (result) => {
    const {diff} = result;
    return [
        '&nbsp;',
        addPositiveDiffMarker(roundValue(diff?.fleschReadingEase)) ?? '-',
        addNegativeDiffMarker(roundValue(diff?.gunningFog)) ?? '-',
        addNegativeDiffMarker(roundValue(diff?.smogIndex)) ?? '-',
        addNegativeDiffMarker(roundValue(diff?.automatedReadabilityIndex)) ??
            '-',
        addNegativeDiffMarker(roundValue(diff?.colemanLiauIndex)) ?? '-',
        addNegativeDiffMarker(roundValue(diff?.linsearWriteFormula)) ?? '-',
        addNegativeDiffMarker(roundValue(diff?.daleChallReadabilityScore)) ??
            '-',
    ];
};

// Convert a report object to a markdown comment
export const reportToComment = ({
    report,
    repository = 'repo-name',
    commit = 'commit-sha',
}) => {
    const nameToLink = (name) =>
        `https://github.com/${repository}/blob/${commit}/${name}`;

    const fileTable = tableToMD({
        headers: ['Path', 'FRE', 'GF', 'SMOG', 'ARI', 'CLI', 'LWF', 'DCRS'],
        rows: report.fileResults.flatMap((result) => [
            resultToScoreTableRow(result, nameToLink),
            resultToDiffTableRow(result),
        ]),
    });

    const averageTable = tableToMD({
        headers: ['&nbsp;', 'FRE', 'GF', 'SMOG', 'ARI', 'CLI', 'LWF', 'DCRS'],
        rows: [
            resultToScoreTableRow(report.averageResult[0]),
            resultToDiffTableRow(report.averageResult[0]),
        ],
    });

    return `
Readability after merging this PR:

<details>
  <summary>View Metric Targets</summary>

Metric | Range | Ideal score
--- | --- | ---
Flesch Reading Ease | 100 (very easy read) to 0 (extremely difficult read) | 60
Gunning Fog | 6 ( very easy read) to 17(extremely difficult read) | 8 or less
SMOG Index | 6 (very easy read) to 14(extremely difficult read) | 8 or less
Auto. Read. Index | 6 (very easy read) to 14(extremely difficult read) | 8 or less
Coleman Liau Index | 6 (very easy read) to 17(extremely difficult read) | 8 or less
Linsear Write | 0 (very easy read) to 11(extremely difficult read) | 8 or less
Dale-Chall Readability | 4.9 (very easy read) to 9.9(extremely difficult read) | 6.9 or less

</details>

🟢 - Shows an _increase_ in readability
🔴 - Shows a _decrease_ in readability

${fileTable}

Overall average:

${averageTable}
`;
};
