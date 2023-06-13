import {ReadabilityScores} from './readability';
import {generateReport} from './report';

function generateReadabilityScores(value: number): ReadabilityScores {
    return {
        fleschReadingEase: value,
        gunningFog: value,
        automatedReadabilityIndex: value,
        daleChallReadabilityScore: value,
        colemanLiauIndex: value,
        readabilityScore: value,
    };
}

describe('generateReport', () => {
    it('should add the diff property to the results, containing the diff values between old and new', () => {
        const oldReadability = {
            fileResults: [
                {name: '1', scores: generateReadabilityScores(1)},
                {name: '2', scores: generateReadabilityScores(1)},
            ],
            averageResult: [
                {name: 'Average', scores: generateReadabilityScores(1)},
            ],
        };
        const newReadability = {
            fileResults: [
                {name: '1', scores: generateReadabilityScores(2)},
                {name: '2', scores: generateReadabilityScores(3)},
            ],
            averageResult: [
                {name: 'Average', scores: generateReadabilityScores(4)},
            ],
        };
        const fileStatuses = {modified: ['1', '2'], added: [], renamed: []};
        const report = generateReport(
            newReadability,
            oldReadability,
            fileStatuses
        );

        expect(report.fileResults.find((result) => result.name === '1')?.diff)
            .toMatchInlineSnapshot(`
            {
              "automatedReadabilityIndex": 1,
              "colemanLiauIndex": 1,
              "daleChallReadabilityScore": 1,
              "fleschReadingEase": 1,
              "gunningFog": 1,
              "readabilityScore": 1,
            }
        `);
        expect(report.fileResults.find((result) => result.name === '2')?.diff)
            .toMatchInlineSnapshot(`
            {
              "automatedReadabilityIndex": 2,
              "colemanLiauIndex": 2,
              "daleChallReadabilityScore": 2,
              "fleschReadingEase": 2,
              "gunningFog": 2,
              "readabilityScore": 2,
            }
        `);
        expect(report.averageResult[0].diff).toMatchInlineSnapshot(`
            {
              "automatedReadabilityIndex": 3,
              "colemanLiauIndex": 3,
              "daleChallReadabilityScore": 3,
              "fleschReadingEase": 3,
              "gunningFog": 3,
              "readabilityScore": 3,
            }
        `);
    });

    it('should only include files that were added or modified', () => {
        const readability = {
            fileResults: [
                {name: '1', scores: generateReadabilityScores(1)},
                {name: '2', scores: generateReadabilityScores(1)},
                {name: '3', scores: generateReadabilityScores(1)},
            ],
            averageResult: [
                {name: 'Average', scores: generateReadabilityScores(1)},
            ],
        };
        const fileStatuses = {modified: ['3'], added: [], renamed: []};
        const report = generateReport(readability, readability, fileStatuses);

        expect(report.fileResults).toHaveLength(1);
        expect(report.fileResults[0].name).toBe('3');
    });

    it('should be able to add diffs when a file is renamed with changes', () => {
        const oldReadability = {
            fileResults: [{name: '1', scores: generateReadabilityScores(1)}],
            averageResult: [
                {name: 'Average', scores: generateReadabilityScores(1)},
            ],
        };
        const newReadability = {
            fileResults: [{name: '2', scores: generateReadabilityScores(2)}],
            averageResult: [
                {name: 'Average', scores: generateReadabilityScores(1)},
            ],
        };
        const fileStatuses = {
            modified: ['2'],
            added: [],
            renamed: [{from: '1', to: '2'}],
        };
        const report = generateReport(
            newReadability,
            oldReadability,
            fileStatuses
        );

        expect(report.fileResults.find((result) => result.name === '2')?.diff)
            .toMatchInlineSnapshot(`
            {
              "automatedReadabilityIndex": 1,
              "colemanLiauIndex": 1,
              "daleChallReadabilityScore": 1,
              "fleschReadingEase": 1,
              "gunningFog": 1,
              "readabilityScore": 1,
            }
        `);
        expect(report.fileResults).toHaveLength(1);
    });
});
