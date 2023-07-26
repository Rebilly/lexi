export const defaultText = `# Lexi playground

Welcome to the Lexi playground.

Lexi is a **GitHub action** which will report a readability score for Markdown files in your pull requests, allowing you to quantify and track documentation improvements.

This playground is a place to experiment with Lexi and see how it works.

## How to use

The playground is divided into two sections: the editor and the results.

### Editor

Write or paste text into the editor to see the results of the readability analysis.

### Results

The results section shows the results of the readability analysis of the text in the editor. The results are updated automatically as you type.

## How does Lexi work?

Lexi calculates a readability score to estimate the complexity and ease of reading for your documentation files. The score can be used as a guide to help you understand how changes may impact the readability of your documentation.

The score is a scaled combination of several readability tests:
- [Flesch Reading Ease](https://en.wikipedia.org/wiki/Flesch_reading_ease)
- [Gunning Fog Index](https://en.wikipedia.org/wiki/Gunning_fog_index)
- [Automated Readability Index (ARI)](https://en.wikipedia.org/wiki/Automated_readability_index)
- [Dale-Chall Readability Score](https://en.wikipedia.org/wiki/Dale%E2%80%93Chall_readability_formula)
- [Coleman–Liau Index](https://en.wikipedia.org/wiki/Coleman%E2%80%93Liau_index)

## How can I use Lexi?

Lexi is a GitHub action which can be used to report a readability score for Markdown files in your pull requests.

For usage instructions, see the [project Readme](https://github.com/Rebilly/lexi).
`;
