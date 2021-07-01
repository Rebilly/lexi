import fs from 'fs';
import path from 'path';
import strip from 'strip-markdown';
import remark from 'remark';
import glob from 'glob';
import visit from 'unist-util-visit';
import readability from 'text-readability';

// Remark plugin to add a period to heading nodes
const addPeriodToHeadings = () => (tree) => {
    visit(tree, 'heading', (node) => {
        visit(node, 'text', (textNode) => {
            if (textNode.value) {
                textNode.value += '.';
            }
        });
    });
};

// Returns scores for a given string
function scoreText(text) {
    const colemanLiauIndex = readability.colemanLiauIndex(text);

    return {
        fleschReadingEase: readability.fleschReadingEase(text),
        gunningFog: readability.gunningFog(text),
        smogIndex: readability.smogIndex(text),
        automatedReadabilityIndex: readability.automatedReadabilityIndex(text),
        linsearWriteFormula: readability.linsearWriteFormula(text),
        daleChallReadabilityScore: readability.daleChallReadabilityScore(text),
        // The CLI index can be NaN for some texts, so ensure it's 0
        colemanLiauIndex: isNaN(colemanLiauIndex) ? 0 : colemanLiauIndex,
    };
}

// Calculates the average of a particular property value, given an array of objects
function calcAverage(arrayOfObjects, accessorFn) {
    return (
        arrayOfObjects.reduce((acc, value) => acc + accessorFn(value), 0) /
        arrayOfObjects.length
    );
}

// Returns a score object containing the averages, given an array of scores
function averageScores(scores) {
    return {
        fleschReadingEase: calcAverage(
            scores,
            (score) => score.fleschReadingEase
        ),
        gunningFog: calcAverage(scores, (score) => score.gunningFog),
        smogIndex: calcAverage(scores, (score) => score.smogIndex),
        automatedReadabilityIndex: calcAverage(
            scores,
            (score) => score.automatedReadabilityIndex
        ),
        colemanLiauIndex: calcAverage(
            scores,
            (score) => score.colemanLiauIndex
        ),
        linsearWriteFormula: calcAverage(
            scores,
            (score) => score.linsearWriteFormula
        ),
        daleChallReadabilityScore: calcAverage(
            scores,
            (score) => score.daleChallReadabilityScore
        ),
    };
}

export function calculateReadability(globPath) {
    const filePaths = glob.sync(globPath);
    const remarker = remark().use(addPeriodToHeadings).use(strip);

    const fileResults = filePaths.map((filePath) => {
        const markdown = fs.readFileSync(filePath);
        const stripped = remarker
            .processSync(markdown)
            .contents // Remove any blank lines
            .replace(/\n+/g, `\n`);
        const scores = scoreText(stripped);

        return {
            name: filePath,
            scores,
        };
    });

    // Unique list of all folders containing our MD files
    const allFolders = [
        ...new Set(filePaths.map((filePath) => path.dirname(filePath))),
    ];
    const folderResults = allFolders.map((folder) => {
        // Take the average from the other results, if that result is
        // inside the folder.
        return {
            name: folder,
            scores: averageScores(
                fileResults
                    .filter((result) => result.name.startsWith(folder))
                    .map((result) => result.scores)
            ),
        };
    });

    const averageResult = [
        {
            name: 'Average',
            scores: averageScores(fileResults.map((result) => result.scores)),
        },
    ];

    return {
        fileResults,
        folderResults,
        averageResult,
    };
}
