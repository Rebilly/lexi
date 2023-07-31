import strip from 'strip-markdown';
import {remark} from 'remark';
import remarkGfm from 'remark-gfm';
import visit from 'unist-util-visit';
import readability from 'text-readability';
import {Plugin} from 'unified';

export const METRIC_RANGES = {
    readabilityScore: {
        min: 0,
        max: 100,
    },
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

// Remove URLs in backticks, for example: `https://example.com`
const removeURLsInBackticks: Plugin = () => (tree) => {
    visit(tree, 'inlineCode', (node) => {
        // @ts-ignore
        // Remove text if the value is a URL
        if (node.value.match(/https?:\/\/[^\s]+/)) {
            // @ts-ignore
            node.value = '';
        }
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
        if (node.children[0]?.type !== 'thematicBreak' || secondBreak < 1) {
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

// Convert colons to periods
const convertColonsToPeriods: Plugin = () => (tree) => {
    visit(tree, 'text', (textNode) => {
        // @ts-ignore
        if (textNode.value.includes(':')) {
            // @ts-ignore
            textNode.value = textNode.value.replace(/:/g, '.');
        }
    });
};

// Iterate through all the table nodes and move their cell contents to the
// top level parent
const convertTableToText: Plugin = () => (tree) => {
    visit(tree, 'table', (tableNode, index, parent) => {
        const cells: [][] = [];
        visit(tableNode, 'tableCell', (cellNode) => {
            // @ts-ignore
            cells.push([...cellNode.children]);
        });

        // Add a period to the end of each cell grouping if it doesnt already exsit
        cells.forEach((cellChildren) => {
            const lastNode = cellChildren[cellChildren.length - 1];
            // @ts-ignore
            if (lastNode?.type === 'text' && !lastNode?.value.endsWith('.')) {
                // @ts-ignore
                lastNode.value += '.';
            }
        });

        const replacementNodes = [
            ...cells.map((cellChildren) => ({
                type: 'paragraph',
                children: cellChildren,
            })),
        ].filter((node) => {
            // Remove any cells with < 4 words
            // @ts-ignore
            const text = node.children.map(({value}) => value).join(' ');
            return text.split(' ').length >= 4;
        });

        // Replace the top level table node with the text nodes
        // @ts-ignore
        parent.children.splice(index, 1, replacementNodes);
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

// Remark plugin to add periods to the end of all list items.
const addPeriodsToListItems: Plugin = () => (tree) => {
    visit(tree, 'listItem', (listItemNode) => {
        visit(listItemNode, 'paragraph', (paragraphNode) => {
            // Convert list items to plain text (as they can have children of many
            // different types, such as italics, bold etc)
            // @ts-ignore
            strip()(paragraphNode);

            visit(paragraphNode, 'text', (textNode) => {
                // @ts-ignore
                if (textNode.value.length && !textNode.value.endsWith('.')) {
                    // @ts-ignore
                    textNode.value += '.';
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
export function scoreText(text: string): ThirdPartyReadabilityScores {
    const colemanLiauIndex = readability.colemanLiauIndex(text);

    const scores = {
        fleschReadingEase: readability.fleschReadingEase(text),
        gunningFog: readability.gunningFog(text),
        automatedReadabilityIndex: readability.automatedReadabilityIndex(text),
        daleChallReadabilityScore: readability.daleChallReadabilityScore(text),
        // The CLI index can be NaN for some texts, so ensure it's 0
        colemanLiauIndex: Number.isNaN(colemanLiauIndex) ? 0 : colemanLiauIndex,
    };

    const capBetween = (min: number, max: number, value: number) => {
        if (max < min) {
            // Swap min and max if max is lower than min
            [min, max] = [max, min];
        }
        return Math.min(Math.max(value, min), max);
    };

    // Cap all the scores
    return Object.entries(scores).reduce(
        (acc, [key, value]) => ({
            ...acc,
            [key]: capBetween(
                METRIC_RANGES[key as keyof typeof METRIC_RANGES].min,
                METRIC_RANGES[key as keyof typeof METRIC_RANGES].max,
                value
            ),
        }),
        {}
    ) as ThirdPartyReadabilityScores;
}

// Returns each score normalized to a value between 0 and 1
function normalizeScores(
    scores: ThirdPartyReadabilityScores
): ThirdPartyReadabilityScores {
    const normalize = (range: {min: number; max: number}, value: number) =>
        (value - range.min) / (range.max - range.min);

    return {
        fleschReadingEase: normalize(
            METRIC_RANGES.fleschReadingEase,
            scores.fleschReadingEase
        ),
        gunningFog: normalize(METRIC_RANGES.gunningFog, scores.gunningFog),
        automatedReadabilityIndex: normalize(
            METRIC_RANGES.automatedReadabilityIndex,
            scores.automatedReadabilityIndex
        ),
        daleChallReadabilityScore: normalize(
            METRIC_RANGES.daleChallReadabilityScore,
            scores.daleChallReadabilityScore
        ),
        colemanLiauIndex: normalize(
            METRIC_RANGES.colemanLiauIndex,
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

// Take our markdown text and clean and process it to the final
// text we want to analyze.
export function preprocessMarkdown(markdown: string) {
    const remarker = remark()
        .use(remarkGfm)
        .use(convertTableToText)
        .use(removeURLsInBackticks)
        .use(removeAdmonitionHeadings)
        .use(convertColonsToPeriods)
        .use(removeShortListItems)
        .use(addPeriodsToListItems)
        .use(removeHeadings)
        .use(removeImageAltText)
        .use(removeCodeBlocks)
        .use(removePageMetadata)
        .use(removeJsItems)
        .use(strip);

    return (
        remarker
            .processSync(markdown)
            .toString()
            .replace(/\n+/g, `\n`) // Remove any blank lines
            // Remove any new lines that are added for manual word wrapping.
            // Here we just presume these will be preceeded by a normal alphabetical character
            .replace(/([a-zA-Z])\n/g, '$1 ')
    );
}

export function calculateReadabilityOfText(text: string): ReadabilityScores {
    if (text.length === 0)
        return {
            readabilityScore: 0,
            fleschReadingEase: METRIC_RANGES.fleschReadingEase.min,
            gunningFog: METRIC_RANGES.gunningFog.min,
            automatedReadabilityIndex:
                METRIC_RANGES.automatedReadabilityIndex.min,
            daleChallReadabilityScore:
                METRIC_RANGES.daleChallReadabilityScore.min,
            colemanLiauIndex: METRIC_RANGES.colemanLiauIndex.min,
        };

    const stripped = preprocessMarkdown(String(text));
    const scores = scoreText(stripped);
    const normalized = normalizeScores(scores);
    const readabilityScore = calculateReadabilityScore(normalized);

    return {
        readabilityScore,
        ...scores,
    };
}
