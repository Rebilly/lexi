import fs from 'fs';
import glob from 'glob';
import {ReadabilityScores, calculateReadabilityOfText} from './readability';

export type SingleReadabilityResult = {
    name: string;
    scores: ReadabilityScores;
};

export type ReadabilityResults = {
    fileResults: SingleReadabilityResult[];
    averageResult: SingleReadabilityResult[];
};

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

// Calculate the readabilty result for all files found in a given path glob.
// This result contains readability scores for each file, and an overall average
export function calculateReadability(globPath: string): ReadabilityResults {
    const filePaths = glob.sync(globPath);

    const fileResults = filePaths.map((filePath) => {
        const markdown = fs.readFileSync(filePath);

        return {
            name: filePath,
            scores: calculateReadabilityOfText(String(markdown)),
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
