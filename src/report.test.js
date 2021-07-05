import {generateReport} from './report';

describe('generateReport', () => {
    it('should add the diff property to the results, containing the diff values between old and new', () => {
        const oldReadability = {
            fileResults: [
                {name: '1', scores: {a: 1, b: 1}},
                {name: '2', scores: {a: 1, b: 1}},
            ],
            averageResult: [{name: 'Average', scores: {a: 1, b: 1}}],
        };
        const newReadability = {
            fileResults: [
                {name: '1', scores: {a: 2, b: 3}},
                {name: '2', scores: {a: 1, b: 1}},
            ],
            averageResult: [{name: 'Average', scores: {a: 3, b: 1}}],
        };
        const fileStatuses = {modified: ['1', '2'], added: []};
        const report = generateReport({
            oldReadability,
            newReadability,
            fileStatuses,
        });

        expect(
            report.fileResults.find((result) => result.name === '1').diff
        ).toStrictEqual({a: 1, b: 2});
        expect(
            report.fileResults.find((result) => result.name === '2').diff
        ).toStrictEqual({a: 0, b: 0});
        expect(report.averageResult[0].diff).toStrictEqual({a: 2, b: 0});
    });

    it('should only include files that were added or modified', () => {
        const readability = {
            fileResults: [
                {name: '1', scores: {a: 1}},
                {name: '2', scores: {a: 1}},
                {name: '3', scores: {a: 1}},
            ],
            averageResult: [{name: 'Average', scores: {a: 1}}],
        };
        const fileStatuses = {modified: ['3'], added: []};
        const report = generateReport({
            oldReadability: readability,
            newReadability: readability,
            fileStatuses,
        });

        expect(report.fileResults).toHaveLength(1);
        expect(report.fileResults[0].name).toBe('3');
    });
});
