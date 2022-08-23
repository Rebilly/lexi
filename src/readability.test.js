import {averageObjectProperties, preprocessMarkdown} from './readability';

describe('averageObjectProperties', () => {
    it('should correctly return the average result for each property in the objects', () => {
        const testObjects = [
            {a: 0.5, b: 100},
            {a: 0.6, b: 200},
            {a: 0.7, b: 300},
        ];
        expect(averageObjectProperties(testObjects)).toMatchInlineSnapshot(`
            Object {
              "a": 0.6,
              "b": 200,
            }
        `);
    });
});

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
});
