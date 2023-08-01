import strip from 'strip-markdown';
import {remark} from 'remark';
import remarkGfm from 'remark-gfm';
import visit, {SKIP} from 'unist-util-visit';
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

const removeUnwantedNodeTypes: Plugin = () => (tree) => {
    const nodeTypesToRemove = [
        'heading',
        'code',
        'html',
        'image',
        'imageReference',
    ];

    visit(tree, nodeTypesToRemove, (_node, index, parent) => {
        parent?.children.splice(index, 1);

        // Do not traverse `node`, continue at the node *now* at `index`.
        return [SKIP, index];
    });
};

// Replace nodes with their text content. For example, replace
// **text** with text
const replaceNodesWithTheirTextContent: Plugin = () => (tree) => {
    const nodeTypesToReplace = [
        'emphasis',
        'strong',
        'inlineCode',
        'list',
        'listItem',
        'link',
        'linkReference',
        'table',
        'tableRow',
        'tableCell',
    ];

    visit(tree, nodeTypesToReplace, (node, index, parent) => {
        // @ts-ignore
        parent?.children.splice(index, 1, ...(node?.children ?? []));
        // Do not traverse `node`, continue at the node *now* at `index`.
        return [SKIP, index];
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

// Remove URLs in backticks, for example: `https://example.com`
const removeURLsInBackticks: Plugin = () => (tree) => {
    visit(tree, 'inlineCode', (node, index, parent) => {
        // @ts-ignore
        // Remove text if the value is a URL
        if (node.value.match(/https?:\/\/[^\s]+/)) {
            // @ts-ignore
            parent?.children.splice(index, 1);
            // Do not traverse `node`, continue at the node *now* at `index`.
            return [SKIP, index];
        }
    });
};

// Remove page metadata between thematic breaks at the begining of the page. For example
// ---
// ...
// ---
const removeFrontmatter: Plugin = () => (tree) => {
    visit(tree, 'root', (node) => {
        // @ts-ignore
        if (node.children[0]?.type !== 'thematicBreak') {
            // There is no frontmatter
            return;
        }

        // @ts-ignore
        const secondThematicBreakIndex = node.children.findIndex(
            (childNode: any, index: number) => {
                // @ts-ignore
                return index > 0 && childNode.type === 'thematicBreak';
            }
        );

        if (secondThematicBreakIndex === -1) {
            // There is only 1 thematic break, so remove it and the first child
            // @ts-ignore
            node?.children.splice(0, 1);
        } else {
            // Remove the two thematic breaks and all children
            // @ts-ignore
            node?.children.splice(0, secondThematicBreakIndex + 1);
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
    // flatten all table cells
    visit(tree, 'tableCell', (tableCellNode) => {
        // @ts-ignore
        replaceNodesWithTheirTextContent(tableCellNode);
    });

    // Add a period to the end of each cell grouping if it doesnt already exsit
    visit(tree, 'tableCell', (tableCellNode) => {
        const lastNode =
            // @ts-ignore
            tableCellNode.children[tableCellNode.children.length - 1];
        if (lastNode?.type === 'text' && !lastNode?.value.endsWith('.')) {
            lastNode.value += '.';
        }
    });

    // Remove any cells with < 4 words
    visit(tree, 'tableCell', (tableCellNode) => {
        // @ts-ignore
        const text = tableCellNode.children.map(({value}) => value).join(' ');
        if (text.split(' ').length < 4) {
            // @ts-ignore
            tableCellNode.children = [];
        }
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

            visit(paragraphNode, 'text', (textNode, index, parent) => {
                // Only keep the list item if it is at least 4 words long
                // @ts-ignore
                if (textNode.value.split(' ').length < 4) {
                    parent?.children.splice(index, 1);
                    // Do not traverse `node`, continue at the node *now* at `index`.
                    return [SKIP, index];
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
        .use(removeJsItems)
        .use(removeUnwantedNodeTypes)
        .use(removeImageAltText)
        .use(removeFrontmatter)
        .use(replaceNodesWithTheirTextContent);

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
