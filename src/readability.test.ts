import {describe} from 'node:test';
import {preprocessMarkdown, calculateReadabilityOfText} from './readability';
import readability from 'text-readability';

// Mock the text-readability library
vi.mock('text-readability', () => ({
    default: {
        automatedReadabilityIndex: vi.fn().mockReturnValue(22),
        colemanLiauIndex: vi.fn().mockReturnValue(19),
        daleChallReadabilityScore: vi.fn().mockReturnValue(11),
        fleschReadingEase: vi.fn().mockReturnValue(0),
        gunningFog: vi.fn().mockReturnValue(19),
    },
}));

describe('markdown preprocessing', () => {
    it('should strip headers', () => {
        const stripped = preprocessMarkdown(
            `
Test 1.
# Header 1
## Header 2
### Header 3
Test 2.
`,
        );

        expect(stripped).toMatchInlineSnapshot(`
            "Test 1.
            Test 2.
            "
        `);
    });

    it('should remove list items with less than 4 words', () => {
        const stripped = preprocessMarkdown(
            `
- This item has many words.
- This item does too.
- This one not.
- Or this.
- Deleted.
- This item also has many words.
`,
        );

        expect(stripped).toMatchInlineSnapshot(`
            "This item has many words.
            This item does too.
            This item also has many words.
            "
        `);
    });

    it('should remove directives/admonitions', () => {
        const stripped = preprocessMarkdown(
            `
Test 1.

:::warning Warning

Admonition content.

:::

Test 2.`,
        );

        expect(stripped).toMatchInlineSnapshot(`
            "Test 1.
            Admonition content.
            Test 2.
            "
        `);
    });

    it('should remove image alt descriptions', () => {
        const stripped = preprocessMarkdown(
            `
Test 1.

Click the left button ![Left Button Icon](../path-to-left/button.png)

Test 2.`,
        );

        expect(stripped).toMatchInlineSnapshot(`
          "Test 1.
          Click the left button&#x20;
          Test 2.
          "
        `);
    });

    it('should strip js code parts from comment block', () => {
        const stripped = preprocessMarkdown(`
<!-- JS block -->
import MenuGrid from '../../components/MenuGrid';
const items = [
    {title: 'Cashier strategies', to: '/docs/settings/cashier-strategies/' },
    {title: 'Custom cashier properties', to: '/docs/settings/custom-cashier-property-sets/' },
];

<!-- JS block -->
Some content. This is paragraph with const items = [];
`);

        expect(stripped).toMatchInlineSnapshot(`
          "
          Some content. This is paragraph with const items = \\[];
          "
        `);
    });

    it('should remove manual linebreaks', () => {
        const stripped = preprocessMarkdown(
            `
This test has lines
that are manually spaced
out by their writer.
It should not remove new lines
that are from different sentences.

Lists of items should not be affected either.
- Here is list item number 1.
- Here is list item number 2.
- Here is list item number 3.

More text after the list.
`,
        );

        expect(stripped).toMatchInlineSnapshot(`
            "This test has lines that are manually spaced out by their writer.
            It should not remove new lines that are from different sentences.
            Lists of items should not be affected either.
            Here is list item number 1.
            Here is list item number 2.
            Here is list item number 3.
            More text after the list.
            "
        `);
    });

    it('should add periods to the end of list items', () => {
        const stripped = preprocessMarkdown(
            `
- Here is list item number 1
- Here is list item number 2
- Here is list item number 3
`,
        );

        expect(stripped).toMatchInlineSnapshot(`
            "Here is list item number 1.
            Here is list item number 2.
            Here is list item number 3.
            "
        `);
    });

    it('should convert colons to periods', () => {
        const stripped = preprocessMarkdown('This includes: a colon');

        expect(stripped).toMatchInlineSnapshot(`"This includes. a colon "`);
    });

    it('should convert tables to text and save cells with more than 4 words', () => {
        const stripped = preprocessMarkdown(
            `
|Value | Gateway | Chance of processing a transaction|
|---|---|---|
|70 |Gateway A| 70% |
|15 |Gateway B| 15% |
|10 |Gateway C| 10% |
|5 |Gateway D| 5% |
`,
        );

        expect(stripped).toMatchInlineSnapshot(`
          "
          Chance of processing a transaction.
          "
        `);
    });

    it('should convert tables without compressing surrounding text', () => {
        const stripped = preprocessMarkdown(
            `
### Some heading text here

Some content text.

|A table header here|A table header here|
|---|---|
|Cell contents goes here|Cell contents goes here|

This content comes after the table
`,
        );

        expect(stripped).toMatchInlineSnapshot(`
          "Some content text.
          A table header here.
          A table header here.
          Cell contents goes here.
          Cell contents goes here.
          This content comes after the table "
        `);
    });

    it('should remove URLs in backticks', () => {
        const stripped = preprocessMarkdown(
            'This includes `https://example.com` a URL.',
        );

        expect(stripped).toMatchInlineSnapshot(`
          "This includes  a URL.
          "
        `);
    });

    it('should remove yaml frontmatter', () => {
        const stripped = preprocessMarkdown(
            `---
title: "Cashier strategies"
description: "Cashier strategies"
---
This is the only content.
`,
        );

        expect(stripped).toMatchInlineSnapshot(`
          "This is the only content.
          "
        `);
    });

    it('should remove more complicated yaml frontmatter', () => {
        const stripped = preprocessMarkdown(
            `---
nested:
  title: "Cashier strategies"
  description: "Cashier strategies"
another:
- /some/path/
---
This is the only content.
`,
        );

        expect(stripped).toMatchInlineSnapshot(`
          "
          This is the only content.
          "
        `);
    });

    it('should remove horizontal rules', () => {
        const stripped = preprocessMarkdown(
            `
Example text 1.

---

Example text 2.

`,
        );

        expect(stripped).toMatchInlineSnapshot(`
          "Example text 1.
          Example text 2.
          "
        `);
    });

    it('should remove horizontal rules with front matter', () => {
        const stripped = preprocessMarkdown(
            `---
title: "Front matter"
nested:
  description: "Cashier strategies"
---

Example text 1.

---

Example text 2.

`,
        );

        expect(stripped).toMatchInlineSnapshot(`
          "Example text 1.
          Example text 2.
          "
        `);
    });

    it('should remove markdoc tags', () => {
        const stripped = preprocessMarkdown(
            `# This is the first heading

Here is the first paragraph text.


{% tabs %}

\`\`\`HTML {% label="HTML" %}
<span>Removed</span>
\`\`\`

\`\`\`CSS {% label="CSS" %}
.removed { }
\`\`\`

{% /tabs %}

Here is the second paragraph text.

{% admonition type="info" %}
This text should be scored by lexi.
{% /admonition %}

Here is the third paragraph text.

{% custom-component
    property=[]
/%}

Here is the fourth paragraph text.

{% custom-component %}
  {% custom-component-2 %}
    The first sub text paragraph.
    {% custom-component-3 %}
      The second sub text paragraph.
    {% /custom-component-3 %}

    {% custom-component-3 %}
      The third sub text paragraph.
    {% /custom-component-3 %}
  {% /step-group %}

  \`\`\`HTML {% label="checkout.html" %}
    <span>Nested code, gone.</span>
  \`\`\`

  \`\`\`JavaScript {% label="server.js" %}
    // Nested code, gone.
  \`\`\`
{% /custom-component %}

Special characters should not break markdoc parsing:
{% custom-component options=[
    {
        "type": "excluded<object>",
    }
] /%}

Here is the sixth paragraph text.
`,
        );

        expect(stripped).toMatchInlineSnapshot(`
          "Here is the first paragraph text.
          Here is the second paragraph text.
          This text should be scored by lexi.
          Here is the third paragraph text.
          Here is the fourth paragraph text.
          The first sub text paragraph.
          The second sub text paragraph.
          Special characters should not break markdoc parsing.
          Here is the sixth paragraph text.
          "
        `);
    });
});

describe('scoring', () => {
    it('should return minimum values for empty text', () => {
        expect(calculateReadabilityOfText('')).toMatchInlineSnapshot(`
          {
            "automatedReadabilityIndex": 22,
            "colemanLiauIndex": 19,
            "daleChallReadabilityScore": 11,
            "fleschReadingEase": 0,
            "gunningFog": 19,
            "readabilityScore": 0,
          }
        `);
    });

    it('should cap min and max scores', () => {
        readability.automatedReadabilityIndex.mockReturnValue(-1);
        readability.colemanLiauIndex.mockReturnValue(-1);
        readability.daleChallReadabilityScore.mockReturnValue(-1);
        readability.fleschReadingEase.mockReturnValue(-1);
        readability.gunningFog.mockReturnValue(-1);

        expect(calculateReadabilityOfText('dummy text')).toMatchObject({
            automatedReadabilityIndex: 6,
            colemanLiauIndex: 6,
            daleChallReadabilityScore: 4.9,
            fleschReadingEase: 0,
            gunningFog: 6,
        });

        readability.automatedReadabilityIndex.mockReturnValue(1000);
        readability.colemanLiauIndex.mockReturnValue(1000);
        readability.daleChallReadabilityScore.mockReturnValue(1000);
        readability.fleschReadingEase.mockReturnValue(1000);
        readability.gunningFog.mockReturnValue(1000);

        expect(calculateReadabilityOfText('dummy text')).toMatchObject({
            automatedReadabilityIndex: 22,
            colemanLiauIndex: 19,
            daleChallReadabilityScore: 11,
            fleschReadingEase: 100,
            gunningFog: 19,
        });
    });
});
