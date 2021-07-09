import {averageObjectProperties} from './readability';

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
