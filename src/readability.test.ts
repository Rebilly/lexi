import {preprocessMarkdown} from './readability';

describe('markdown preprocessing', () => {
    it('should strip headers', () => {
        const stripped = preprocessMarkdown(
            `
Test 1.
# Header 1
## Header 2
### Header 3
Test 2.
`
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
`
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

Test 2.`
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

Test 2.`
        );

        expect(stripped).toMatchInlineSnapshot(`
            "Test 1.
            Click the left button 
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
`
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
`
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
`
        );

        expect(stripped).toMatchInlineSnapshot(`
          "Chance of processing a transaction.
          "
        `);
    });
});
