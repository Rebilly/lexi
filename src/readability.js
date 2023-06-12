import fs from 'fs';
import strip from 'strip-markdown';
import remark from 'remark';
import glob from 'glob';
import visit from 'unist-util-visit';
import readability from 'text-readability';

// Remark plugin to remove headings.
// Generally our headings are short and do not contribute in a
// meaningful way to our readability scores
const removeHeadings = () => (tree) => {
    visit(tree, 'heading', (headingNode) => {
        visit(headingNode, 'text', (textNode) => {
            textNode.value = '';
        });
    });
};

// Remove the Admonition start and end lines, including the header
// text as it's not a useful part of the page content. For example
// :::warning Warning
// Would be removed.
const removeAdmonitionHeadings = () => (tree) => {
    visit(tree, 'text', (textNode) => {
        if(textNode.value.startsWith(':::')){
            textNode.value = '';
        }
    });
};

// Remove code blocks. For example
// ```json
// ...
// ```
const removeCodeBlocks = () => (tree) => {
    visit(tree, 'code', (node) => {
        node.value = '';
    });
};

// Remove page metadata between thematic breaks at the begining of the page. For example
// ---
// ...
// ---
const removePageMetadata = () => (tree) => {
    visit(tree, 'root', (node) => {
        const secondBreak = node.children.findIndex(({type}, index) => type === 'thematicBreak' && index > 0);
        if (node.children[0].type !== 'thematicBreak' || secondBreak < 1) {
            return
        }
        for (let i = 1; i < secondBreak; i += 1) {
            node.children[i].value = '';
            node.children[i].children = [];
        }
    });
};

// Alt text is not a part of the sentence structure, so we should
// remove it.
const removeImageAltText = () => (tree) => {
    visit(tree, 'image', (imageNode) => {
        imageNode.alt = '';
    });
};

// Remark plugin to remove list items that have less than 4 words.
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

const removeJsItems = () => (tree) => {
    let visitNexParagraph = false;
    visit(tree, 'root', (listItemNode) => {
        visit(listItemNode, ['html', 'paragraph'], (elementNode) => {
            if (visitNexParagraph && elementNode.type === 'paragraph') {
                visit(elementNode, ['text', 'inlineCode'], (textNode) => {textNode.value = ''})
            }
            if (elementNode.type === 'html') {
                visitNexParagraph =  elementNode.value === '<!-- JS block -->' && !visitNexParagraph;
            }
        })
    })
}

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

// Returns scores for a given string
function normalizeScores(scores) {
    const ranges = {
        fleschReadingEase: {
            min: 0,
            max: 100,
        },
        gunningFog: {
            min: 19,
            max: 6,
        },
        automatedReadabilityIndex: {
            min: 22,
            max: 6
        },
        daleChallReadabilityScore: {
            min: 11,
            max: 4.9
        },
        colemanLiauIndex: {
            min: 19,
            max: 6
        }
    };

    const normalize = (range, value) =>
        ((value - range.min) / (range.max - range.min));

    return {
        fleschReadingEase: normalize(ranges.fleschReadingEase, scores.fleschReadingEase),
        gunningFog: normalize(ranges.gunningFog, scores.gunningFog),
        automatedReadabilityIndex: normalize(ranges.automatedReadabilityIndex, scores.automatedReadabilityIndex),
        daleChallReadabilityScore: normalize(ranges.daleChallReadabilityScore, scores.daleChallReadabilityScore),
        colemanLiauIndex: normalize(ranges.colemanLiauIndex, scores.colemanLiauIndex)
    };
}

function createOverallReadabilityScore(normalizeScores){
    const weights = {
        fleschReadingEase: 0.1653977378,
        gunningFog: 0.2228367277,
        automatedReadabilityIndex: 0.2325290236,
        daleChallReadabilityScore: 0.1960641698,
        colemanLiauIndex: 0.1831723411,
    };

    // The reability score from 0 to 1.0
    const normalizedReadabilityScore = (normalizeScores.fleschReadingEase * weights.fleschReadingEase) +
    (normalizeScores.gunningFog * weights.gunningFog) +
    (normalizeScores.automatedReadabilityIndex * weights.automatedReadabilityIndex) +
    (normalizeScores.daleChallReadabilityScore * weights.daleChallReadabilityScore) +
    (normalizeScores.colemanLiauIndex * weights.colemanLiauIndex);

    // Scale the score from 0 to 100
    return 100 * normalizedReadabilityScore;
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

// Take our markdown text and clean and process it to the final
// text we want to analyze.
export function preprocessMarkdown(markdown) {
    const remarker = remark()
        .use(removeShortListItems)
        .use(removeHeadings)
        .use(removeAdmonitionHeadings)
        .use(removeImageAltText)
        .use(removeCodeBlocks)
        .use(removePageMetadata)
        .use(removeJsItems)
        .use(strip);

    return remarker
        .processSync(markdown)
        .contents
        // Remove any blank lines
        .replace(/\n+/g, `\n`)
        // Remove any new lines that are added for manual word wrapping.
        // Here we just presume these will be preceeded by a normal alphabetical character
        .replace(/([a-zA-Z])\n/g, '$1 ');
}

// Calculate the readabilty result for all files found in a given path glob.
// This result contains readability scores for each file, and an overall average
export function calculateReadability(globPath) {
    const filePaths = glob.sync(globPath);

    const fileResults = filePaths.map((filePath) => {
        const markdown = fs.readFileSync(filePath);
        const stripped = preprocessMarkdown(markdown);
        const scores = scoreText(stripped);
        const normalized = normalizeScores(scores);
        const overallReadabilityScore = createOverallReadabilityScore(normalized);

        return {
            name: filePath,
            scores: {
                overallReadabilityScore, 
                ...scores
            }
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
