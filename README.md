# Lexi

Report a readability score for Markdown files in your pull requests, allowing you to quantify and track documentation improvements.

<details>
  <summary>See example pull request comment</summary>
**Overall readability score:** 20.18 (🟢 +0.97)

File | Readability
--- | ---
[README.md](https://github.com/Rebilly/lexi/blob/cce569da633a092c0a9b09bc1fe6d3df1b4dcb26/README.md "README.md") | 22.36 (🟢 +3.86)


<details>
  <summary>View detailed metrics</summary>

🟢 - Shows an _increase_ in readability
🔴 - Shows a _decrease_ in readability

File | Readability | FRE | GF | ARI | CLI | DCRS
--- | --- | --- | --- | --- | --- | ---
[README.md](https://github.com/Rebilly/lexi/blob/cce569da633a092c0a9b09bc1fe6d3df1b4dcb26/README.md "README.md") | 22.36 | 44.11 | 16.67 | 28.7 | 11.85 | 7.66
&nbsp; | 🟢 +3.86 | 🟢 +2.03 | 🟢 +0.75 | 🟢 +2.2 | 🔴 -0.7 | 🟢 +0.01


Averages:

&nbsp; | Readability | FRE | GF | ARI | CLI | DCRS
--- | --- | --- | --- | --- | --- | ---
Average | 20.18 | 14 | 16.94 | 19.17 | 15.11 | 9.52
&nbsp; | 🟢 +0.97 | 🟢 +0.51 | 🟢 +0.19 | 🟢 +0.55 | 🔴 -0.17 | 🟢 +0


<details>
  <summary>View metric targets</summary>

Metric | Range | Ideal score
--- | --- | ---
Flesch Reading Ease | 100 (very easy read) to 0 (extremely difficult read) | 60
Gunning Fog | 6 (very easy read) to 17 (extremely difficult read) | 8 or less
Auto. Read. Index | 6 (very easy read) to 14 (extremely difficult read) | 8 or less
Coleman Liau Index | 6 (very easy read) to 17 (extremely difficult read) | 8 or less
Dale-Chall Readability | 4.9 (very easy read) to 9.9 (extremely difficult read) | 6.9 or less

</details>

</details>

</details>

## Readability score

Lexi calculates a readability score to estimate the complexity and ease of reading for your documentation files. The score can be used as a guide to help you understand how changes may impact the readability of your documentation.

The score is a scaled combination of several readability tests:
- [Flesch Reading Ease](https://en.wikipedia.org/wiki/Flesch_reading_ease)
- [Gunning Fog Index](https://en.wikipedia.org/wiki/Gunning_fog_index)
- [Automated Readability Index (ARI)](https://en.wikipedia.org/wiki/Automated_readability_index)
- [Dale-Chall Readability Score](https://en.wikipedia.org/wiki/Dale%E2%80%93Chall_readability_formula)
- [Coleman–Liau Index](https://en.wikipedia.org/wiki/Coleman%E2%80%93Liau_index)

## Usage

### Inputs

| Name           | Necessity | Description                                                                                                                                                                                                                                               |
| -------------- | --------- |-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `github-token` | Required  | The GitHub token used to post the report comment to the pull request. The [GitHub Actions token](https://docs.github.com/en/actions/reference/authentication-in-a-workflow#about-the-github_token-secret) can be used with `${{ secrets.GITHUB_TOKEN }}`. |
| `glob`         | Required  | The glob pattern to use for matching Markdown files you want analysed                                                                                                                                                                                     |

### Example workflow

```yaml
name: Report readability

# This action only works on pull request events
on: pull_request

jobs:
    report-readability:
        name: Report readability
        runs-on: ubuntu-latest
        steps:
            - name: Checkout repo
              uses: actions/checkout@v2
            - uses: Rebilly/lexi@v1
              with:
                  github-token: ${{ secrets.GITHUB_TOKEN }}
                  glob: '**/*.md'
```

## Development

### Commands

| command     | description                                                                                                                                                                                                                                     |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `test`      | Run the unit tests.                                                                                                                                                                                                                             |
| `lint`      | Run eslint on all files.                                                                                                                                                                                                                        |
| `format`    | Run prettier on all files.                                                                                                                                                                                                                      |
| `build`     | build the dist file. You are required to run this locally in order to build the dist before opening a PR.                                                                                                                                       |
| `run:local:report` | Run the action on two local folders, for testing and development. The first argument is the old ("base branch") folder and the sedcond argument is the new ("head branch") folder. For example `yarn run:local:report ./test-data/old ./test-data/new`. |
| `run:local:debugfile` | Show what the program parses from a single file, after stripping all non-wanted items from the file, and before rating the readability. For example `yarn run:local:debugfile ./test-data/new/test-document.md`. |
| `playground:dev` | Open the playground in local development mode for testing readability scores. |

### Testing

When developing the action, it can be useful to be able to run it locally rather than pushing a branch and running your development version on GitHub.

You can test the action locally by running the `run:local:report` command. This will report readability on two different folders, as if they were a pull request.

For example: `yarn run:local:report ./test-data/old ./test-data/new`
