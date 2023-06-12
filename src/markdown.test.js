import {reportToComment} from './markdown';

const mockScores = (value) => ({
    readabilityScore: value,
    fleschReadingEase: value,
    gunningFog: value,
    smogIndex: value,
    automatedReadabilityIndex: value,
    colemanLiauIndex: value,
    linsearWriteFormula: value,
    daleChallReadabilityScore: value,
});

describe('reportToComment', () => {
    it('generates a correct comment for the report', () => {
        const report = {
            fileResults: [
                {
                    name: './folder/file-1.md',
                    scores: mockScores(10),
                    diff: mockScores(1),
                },
                {
                    name: './folder/file-2.md',
                    scores: mockScores(5),
                    diff: mockScores(-1),
                },
                {
                    name: './folder/file-3.md',
                    scores: mockScores(15),
                    diff: mockScores(0),
                },
                {
                    name: './folder/new-file.md',
                    scores: mockScores(20),
                    diff: null,
                },
            ],
            averageResult: [
                {
                    name: 'Average',
                    scores: mockScores(1),
                    diff: mockScores(1),
                },
            ],
        };

        expect(reportToComment({report})).toMatchInlineSnapshot(`
            "
            Readability after merging this PR: 1/100 (🟢 +1)

            Path | Readability
            --- | ---
            [file-1.md](https://github.com/repo-name/blob/commit-sha/./folder/file-1.md \\"./folder/file-1.md\\") | 10 (🟢 +1)
            [file-2.md](https://github.com/repo-name/blob/commit-sha/./folder/file-2.md \\"./folder/file-2.md\\") | 5 (🔴 -1)
            [file-3.md](https://github.com/repo-name/blob/commit-sha/./folder/file-3.md \\"./folder/file-3.md\\") | 15 (🟢 +0)
            [new-file.md](https://github.com/repo-name/blob/commit-sha/./folder/new-file.md \\"./folder/new-file.md\\") | 20 (-)


            <details>
              <summary>View Detailed Metrics</summary>

            🟢 - Shows an _increase_ in readability
            🔴 - Shows a _decrease_ in readability

            Path | Readability | FRE | GF | ARI | CLI | DCRS
            --- | --- | --- | --- | --- | --- | ---
            [file-1.md](https://github.com/repo-name/blob/commit-sha/./folder/file-1.md \\"./folder/file-1.md\\") | 10 | 10 | 10 | 10 | 10 | 10
            &nbsp; | 🟢 +1 | 🟢 +1 | 🔴 +1 | 🔴 +1 | 🔴 +1 | 🔴 +1
            [file-2.md](https://github.com/repo-name/blob/commit-sha/./folder/file-2.md \\"./folder/file-2.md\\") | 5 | 5 | 5 | 5 | 5 | 5
            &nbsp; | 🔴 -1 | 🔴 -1 | 🟢 -1 | 🟢 -1 | 🟢 -1 | 🟢 -1
            [file-3.md](https://github.com/repo-name/blob/commit-sha/./folder/file-3.md \\"./folder/file-3.md\\") | 15 | 15 | 15 | 15 | 15 | 15
            &nbsp; | 🟢 +0 | 🟢 +0 | 🟢 0 | 🟢 0 | 🟢 0 | 🟢 0
            [new-file.md](https://github.com/repo-name/blob/commit-sha/./folder/new-file.md \\"./folder/new-file.md\\") | 20 | 20 | 20 | 20 | 20 | 20
            &nbsp; | - | - | - | - | - | -


            Averages:

            &nbsp; | Readability | FRE | GF | ARI | CLI | DCRS
            --- | --- | --- | --- | --- | --- | ---
            Average | 1 | 1 | 1 | 1 | 1 | 1
            &nbsp; | 🟢 +1 | 🟢 +1 | 🔴 +1 | 🔴 +1 | 🔴 +1 | 🔴 +1


            <details>
              <summary>View Metric Targets</summary>

            Metric | Range | Ideal score
            --- | --- | ---
            Flesch Reading Ease | 100 (very easy read) to 0 (extremely difficult read) | 60
            Gunning Fog | 6 (very easy read) to 17 (extremely difficult read) | 8 or less
            Auto. Read. Index | 6 (very easy read) to 14 (extremely difficult read) | 8 or less
            Coleman Liau Index | 6 (very easy read) to 17 (extremely difficult read) | 8 or less
            Dale-Chall Readability | 4.9 (very easy read) to 9.9 (extremely difficult read) | 6.9 or less

            </details>

            </details>
            "
        `);
    });
});
