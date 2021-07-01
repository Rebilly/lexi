import path from 'path';

const arrayToCells = (array) => array.join(' | ') + '\n';

const tableToMD = ({headers, rows}) => {
    let table = arrayToCells(headers);
    table += arrayToCells(Array.from({length: headers.length}, () => '---'));
    table += rows.map((row) => arrayToCells(row)).join('');

    return table;
};

const roundValue = (value) => {
    if (typeof value !== 'undefined') {
        return parseFloat(value.toFixed(2));
    }
};

const addPositiveDiffMarker = (value) => {
    if (typeof value !== 'undefined') {
        if (value === 0 || value > 0) {
            return `🟢 +${value}`;
        } else {
            return `🔴 ${value}`;
        }
    }
};

const addNegativeDiffMarker = (value) => {
    if (typeof value !== 'undefined') {
        if (value === 0 || value < 0) {
            return `🟢 ${value}`;
        } else {
            return `🔴 +${value}`;
        }
    }
};

const resultToScoreTableRow = (result, nameToLink) => {
    const {name, scores} = result;
    const filenameOnly = path.basename(name);
    const displayName = nameToLink
        ? `[${filenameOnly}](${nameToLink(name)} "${name}")`
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

${fileTable}

Overall average:
${averageTable}
`;
};
