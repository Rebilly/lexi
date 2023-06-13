import path from 'path';
import {
    ReadabilityReport,
    ReadabilityReportFileResult,
    SingleReadabilityResultWithDiff,
} from './report';

const arrayToCells = (rows: string[]) => `${rows.join(' | ')}\n`;

const tableToMD = ({headers, rows}: {headers: string[]; rows: string[][]}) => {
    let table = arrayToCells(headers);
    table += arrayToCells(Array.from({length: headers.length}, () => '---'));
    table += rows.map((row) => arrayToCells(row)).join('');

    return table;
};

// Round a number to 2 decimal places, but return a float
// so that trailing 0's will not be stringified
const roundValue = (value?: number) => {
    if (typeof value !== 'undefined') {
        return parseFloat(value.toFixed(2));
    }
    return value;
};

// Adds an emoji marker to a value.
// If the value is POSITIVE, we consider it a good value
// and add a positive marker, otherwise a negative marker
const addPositiveDiffMarker = (value?: number) => {
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
// We also flip the value to be positive, so that postive
// scores always show a + sign.
const addNegativeDiffMarker = (value?: number) => {
    if (typeof value !== 'undefined') {
        if (value === 0 || value < 0) {
            return `🟢 +${-value}`;
        }
        return `🔴 ${-value}`;
    }
    return value;
};

// Returns a table row showing the absolute scores and  for a given result object.
// If a nameToLinkFunction is passed, the result name will be created
// as link, using the result of that function as the target
const resultToReadabilityRowWithDiff = (
    result: SingleReadabilityResultWithDiff,
    nameToLinkFunction?: (name: string) => string
) => {
    const {name, scores} = result;
    const filenameOnly = path.basename(name);
    const displayName = nameToLinkFunction
        ? `[${filenameOnly}](${nameToLinkFunction(name)} "${name}")`
        : name;

    const readabilityScore = roundValue(scores.readabilityScore);
    const diff =
        addPositiveDiffMarker(roundValue(result.diff?.readabilityScore)) ?? '-';

    return [displayName, `${readabilityScore} (${diff})`];
};

// Returns a table row showing the absolute scores for a given result object.
// If a nameToLinkFunction is passed, the result name will be created
// as link, using the result of that function as the target
const resultToScoreTableRow = (
    result: SingleReadabilityResultWithDiff,
    nameToLinkFunction?: (name: string) => string
): string[] => {
    const {name, scores} = result;
    const filenameOnly = path.basename(name);
    const displayName = nameToLinkFunction
        ? `[${filenameOnly}](${nameToLinkFunction(name)} "${name}")`
        : name;

    return [
        displayName,
        String(roundValue(scores.readabilityScore) ?? ''),
        String(roundValue(scores.fleschReadingEase) ?? ''),
        String(roundValue(scores.gunningFog) ?? ''),
        String(roundValue(scores.automatedReadabilityIndex) ?? ''),
        String(roundValue(scores.colemanLiauIndex) ?? ''),
        String(roundValue(scores.daleChallReadabilityScore) ?? ''),
    ];
};

// Returns a table row showing the difference in scores for a given result object.
const resultToDiffTableRow = (result: SingleReadabilityResultWithDiff) => {
    const {diff} = result;
    return [
        '&nbsp;',
        addPositiveDiffMarker(roundValue(diff?.readabilityScore)) ?? '-',
        addPositiveDiffMarker(roundValue(diff?.fleschReadingEase)) ?? '-',
        addNegativeDiffMarker(roundValue(diff?.gunningFog)) ?? '-',
        addNegativeDiffMarker(roundValue(diff?.automatedReadabilityIndex)) ??
            '-',
        addNegativeDiffMarker(roundValue(diff?.colemanLiauIndex)) ?? '-',
        addNegativeDiffMarker(roundValue(diff?.daleChallReadabilityScore)) ??
            '-',
    ];
};

// Convert a report object to a markdown comment
export const reportToComment = (
    report: ReadabilityReport,
    repository = 'repo-name',
    commit = 'commit-sha'
) => {
    const nameToLink = (name: string) =>
        `https://github.com/${repository}/blob/${commit}/${name}`;

    const readabilityTable = tableToMD({
        headers: ['File', 'Readability'],
        rows: report.fileResults.map((result) =>
            resultToReadabilityRowWithDiff(result, nameToLink)
        ),
    });

    const detailedFileTable = tableToMD({
        headers: ['File', 'Readability', 'FRE', 'GF', 'ARI', 'CLI', 'DCRS'],
        rows: report.fileResults.flatMap((result) => [
            resultToScoreTableRow(result, nameToLink),
            resultToDiffTableRow(result),
        ]),
    });

    const averageTable = tableToMD({
        headers: ['&nbsp;', 'Readability', 'FRE', 'GF', 'ARI', 'CLI', 'DCRS'],
        rows: [
            resultToScoreTableRow(report.averageResult[0]),
            resultToDiffTableRow(report.averageResult[0]),
        ],
    });

    const averageReadability = roundValue(
        report.averageResult[0].scores.readabilityScore
    );
    const averageReadabilityDiff = addPositiveDiffMarker(
        roundValue(report.averageResult[0].diff?.readabilityScore)
    );

    return `
**Overall readability score:** ${averageReadability}/100 (${averageReadabilityDiff})

${readabilityTable}

<details>
  <summary>View detailed metrics</summary>

🟢 - Shows an _increase_ in readability
🔴 - Shows a _decrease_ in readability

${detailedFileTable}

Averages:

${averageTable}

<details>
  <summary>View metric targets</summary>

Metric | Range | Ideal score
--- | --- | ---
Flesch Reading Ease | 100 (very easy read) to 0 (extremely difficult read) | 60
Gunning Fog | 6 (very easy read) to 17 (extremely difficult read) | 8 or less
Auto. Read. Index | 6 (very easy read) to 14 (extremely difficult read) | 8 or less
Coleman Liau Index | 6 (very easy read) to 17 (extremely difficult read) | 8 or less
Dale-Chall Readability | 4.9 (very easy read) to 9.9 (extremely difficult read) | 6.9 or less

</details>

</details>
`;
};
