import fs from 'fs';
import strip from 'strip-markdown';
import remark from 'remark';
import glob from 'glob';
import visit from 'unist-util-visit';
import readability from 'text-readability';
import {Plugin} from 'unified';

type ThirdPartyReadabilityScores = {
    fleschReadingEase: number;
    gunningFog: number;
    automatedReadabilityIndex: number;
    daleChallReadabilityScore: number;
    colemanLiauIndex: number;
};

export type ReadabilityScores = {
    readabilityScore: number;
} & ThirdPartyReadabilityScores;

export type SingleReadabilityResult = {
    name: string;
    scores: ReadabilityScores;
};

export type ReadabilityResults = {
    fileResults: SingleReadabilityResult[];
    averageResult: SingleReadabilityResult[];
};

// Remark plugin to remove headings.
// Generally our headings are short and do not contribute in a
// meaningful way to our readability scores
const removeHeadings: Plugin = () => (tree) => {
    visit(tree, 'heading', (headingNode) => {
        visit(headingNode, 'text', (textNode) => {
            // @ts-ignore
            textNode.value = '';
        });
    });
};

// Remove the Admonition start and end lines, including the header
// text as it's not a useful part of the page content. For example
// :::warning Warning
// Would be removed.
const removeAdmonitionHeadings: Plugin = () => (tree) => {
    visit(tree, 'text', (textNode) => {
        // @ts-ignore
        if (textNode.value.startsWith(':::')) {
            // @ts-ignore
            textNode.value = '';
        }
    });
};

// Remove code blocks. For example
// ```json
// ...
// ```
const removeCodeBlocks: Plugin = () => (tree) => {
    visit(tree, 'code', (node) => {
        // @ts-ignore
        node.value = '';
    });
};

// Remove page metadata between thematic breaks at the begining of the page. For example
// ---
// ...
// ---
const removePageMetadata: Plugin = () => (tree) => {
    visit(tree, 'root', (node) => {
        // @ts-ignore
        const secondBreak = node.children.findIndex(
            ({type}: {type: string}, index: number) =>
                type === 'thematicBreak' && index > 0
        );
        // @ts-ignore
        if (node.children[0].type !== 'thematicBreak' || secondBreak < 1) {
            return;
        }
        for (let i = 1; i < secondBreak; i += 1) {
            // @ts-ignore
            node.children[i].value = '';
            // @ts-ignore
            node.children[i].children = [];
        }
    });
};

// Alt text is not a part of the sentence structure, so we should
// remove it.
const removeImageAltText: Plugin = () => (tree) => {
    visit(tree, 'image', (imageNode) => {
        // @ts-ignore
        imageNode.alt = '';
    });
};

// Remark plugin to remove list items that have less than 4 words.
// For us these tend to be long lists of values, and throws off
// readability results.
const removeShortListItems: Plugin = () => (tree) => {
    visit(tree, 'listItem', (listItemNode) => {
        visit(listItemNode, 'paragraph', (paragraphNode) => {
            // Convert list items to plain text (as they can have children of many
            // different types, such as italics, bold etc)
            // @ts-ignore
            strip()(paragraphNode);

            visit(paragraphNode, 'text', (textNode) => {
                // Only keep the list item if it is at least 4 words long
                // @ts-ignore
                if (textNode.value.split(' ').length < 4) {
                    // @ts-ignore
                    textNode.value = '';
                }
            });
        });
    });
};

const removeJsItems: Plugin = () => (tree) => {
    let visitNexParagraph = false;
    visit(tree, 'root', (listItemNode) => {
        visit(listItemNode, ['html', 'paragraph'], (elementNode) => {
            if (visitNexParagraph && elementNode.type === 'paragraph') {
                visit(elementNode, ['text', 'inlineCode'], (textNode) => {
                    // @ts-ignore
                    textNode.value = '';
                });
            }
            if (elementNode.type === 'html') {
                visitNexParagraph =
                    // @ts-ignore
                    elementNode.value === '<!-- JS block -->' &&
                    !visitNexParagraph;
            }
        });
    });
};

// Returns scores for a given string
export function scoreText(text: string) {
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

// Returns each score normalized to a value between 0 and 1
function normalizeScores(
    scores: ThirdPartyReadabilityScores
): ThirdPartyReadabilityScores {
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
            max: 6,
        },
        daleChallReadabilityScore: {
            min: 11,
            max: 4.9,
        },
        colemanLiauIndex: {
            min: 19,
            max: 6,
        },
    };

    const normalize = (range: {min: number; max: number}, value: number) =>
        (value - range.min) / (range.max - range.min);

    return {
        fleschReadingEase: normalize(
            ranges.fleschReadingEase,
            scores.fleschReadingEase
        ),
        gunningFog: normalize(ranges.gunningFog, scores.gunningFog),
        automatedReadabilityIndex: normalize(
            ranges.automatedReadabilityIndex,
            scores.automatedReadabilityIndex
        ),
        daleChallReadabilityScore: normalize(
            ranges.daleChallReadabilityScore,
            scores.daleChallReadabilityScore
        ),
        colemanLiauIndex: normalize(
            ranges.colemanLiauIndex,
            scores.colemanLiauIndex
        ),
    };
}

function calculateReadabilityScore(
    normalizedScores: ThirdPartyReadabilityScores
) {
    const weights = {
        fleschReadingEase: 0.1653977378,
        gunningFog: 0.2228367277,
        automatedReadabilityIndex: 0.2325290236,
        daleChallReadabilityScore: 0.1960641698,
        colemanLiauIndex: 0.1831723411,
    };

    // The reability score from 0 to 1.0
    const normalizedReadabilityScore =
        normalizedScores.fleschReadingEase * weights.fleschReadingEase +
        normalizedScores.gunningFog * weights.gunningFog +
        normalizedScores.automatedReadabilityIndex *
            weights.automatedReadabilityIndex +
        normalizedScores.daleChallReadabilityScore *
            weights.daleChallReadabilityScore +
        normalizedScores.colemanLiauIndex * weights.colemanLiauIndex;

    // Scale the score from 0 to 100
    return 100 * normalizedReadabilityScore;
}

// Calculates the average of a particular property value, given an array of objects
function calcAverage(
    arrayOfObjects: Record<string, number>[],
    accessorFn: (value: Record<string, number>) => number
) {
    return (
        arrayOfObjects.reduce(
            (acc: number, value) => acc + accessorFn(value),
            0
        ) / arrayOfObjects.length
    );
}

// Returns a score object containing the averages, given an array of scores
export function averageObjectProperties(objects: Record<string, number>[]) {
    return Object.keys(objects[0]).reduce(
        (acc: Record<string, number>, key) => {
            acc[key] = calcAverage(objects, (object) => object[key]);
            return acc;
        },
        {}
    );
}

// Take our markdown text and clean and process it to the final
// text we want to analyze.
export function preprocessMarkdown(markdown: string) {
    const remarker = remark()
        .use(removeShortListItems)
        .use(removeHeadings)
        .use(removeAdmonitionHeadings)
        .use(removeImageAltText)
        .use(removeCodeBlocks)
        .use(removePageMetadata)
        .use(removeJsItems)
        .use(strip);

    return (
        remarker
            .processSync(markdown)
            .contents // Remove any blank lines
            .toString()
            .replace(/\n+/g, `\n`)
            // Remove any new lines that are added for manual word wrapping.
            // Here we just presume these will be preceeded by a normal alphabetical character
            .replace(/([a-zA-Z])\n/g, '$1 ')
    );
}

// Calculate the readabilty result for all files found in a given path glob.
// This result contains readability scores for each file, and an overall average
export function calculateReadability(globPath: string): ReadabilityResults {
    const filePaths = glob.sync(globPath);

    const fileResults = filePaths.map((filePath) => {
        const markdown = fs.readFileSync(filePath);
        const stripped = preprocessMarkdown(String(markdown));
        const scores = scoreText(stripped);
        const normalized = normalizeScores(scores);
        const readabilityScore = calculateReadabilityScore(normalized);

        return {
            name: filePath,
            scores: {
                readabilityScore,
                ...scores,
            },
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
        // @ts-ignore
        averageResult,
    };
}
