import {describe, it, expect, vi} from 'vitest';

describe('readability (integration)', () => {
    it('should not change scores for semantic line breaks vs normal wrapping', async () => {
        // Ensure we use the real library (other tests mock this module).
        vi.unmock('text-readability');

        const {calculateReadabilityOfText} = await import('./readability');

        const original = `
At ExampleDocs, your safety is our top priority.
That's why we require Know Your Customer (KYC) verification.
KYC protects your account from fraud and identity theft.
`;

        // Same content, different line breaks (semantic line breaks / wrapping).
        const semantic = `
At ExampleDocs,
your safety is our top priority.
That's why we require Know Your Customer (KYC) verification.
KYC protects your account from fraud and identity theft.
`;

        const a = calculateReadabilityOfText(original);
        const b = calculateReadabilityOfText(semantic);

        const metrics = [
            'readabilityScore',
            'fleschReadingEase',
            'gunningFog',
            'automatedReadabilityIndex',
            'daleChallReadabilityScore',
            'colemanLiauIndex',
        ] as const;

        for (const metric of metrics) {
            expect(Math.abs(a[metric] - b[metric])).toBeLessThan(1e-9);
        }
    });
});
