import fs from 'fs';
import strip from 'strip-markdown';
import remark from 'remark';
import glob from 'glob';
import visit from 'unist-util-visit';
import readability from 'text-readability';

// Remark plugin to add a period to heading nodes.
// This helps the readability algorithms correctly calculate
// sentence length.
const addPeriodToHeadings = () => (tree) => {
    visit(tree, 'heading', (headingNode) => {
        visit(headingNode, 'text', (textNode) => {
            if (textNode.value) {
                textNode.value += '.';
            }
        });
    });
};

// Remark plugin to remove list items that have less than 4 works.
// For us these tend to be long lists of values, and throws off
// readability results.
const removeShortListItems = () => (tree) => {
    visit(tree, 'listItem', (listItemNode) => {
        visit(listItemNode, 'paragraph', (paragraphNode) => {
            // Convert list items to plain text (as they can have children of many
            // different types, such as italics, bold etc)
            strip()(paragraphNode);

            visit(paragraphNode, 'text', (textNode) => {
                // Only keep the list item if it is at least 4 words long
                if (textNode.value.split(' ').length < 4) {
                    textNode.value = '';
                }
            });
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
        colemanLiauIndex: Number.isNaN(colemanLiauIndex) ? 0 : colemanLiauIndex,
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
export function averageObjectProperties(objects) {
    return Object.keys(objects[0]).reduce((acc, key) => {
        acc[key] = calcAverage(objects, (object) => object[key]);
        return acc;
    }, {});
}

// Calculate the readabilty result for all files found in a given path glob.
// This result contains readability scores for each file, and an overall average
export function calculateReadability(globPath) {
    const filePaths = glob.sync(globPath);
    const remarker = remark()
        .use(removeShortListItems)
        .use(addPeriodToHeadings)
        .use(strip);

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

    const averageResult = [
        {
            name: 'Average',
            scores: averageObjectProperties(
                fileResults.map((result) => result.scores)
            ),
        },
    ];

    return {
        fileResults,
        averageResult,
    };
}
