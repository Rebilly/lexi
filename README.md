# readability-reporter

This action reports readability scores and their changes for Markdown files in your pull requests, allowing you to quantify and track documentation improvements.

<details>
  <summary>See example pull request comment</summary>

Readability after merging this PR:

<details>
  <summary>View Metric Targets</summary>

| Metric                 | Range                                                  | Ideal score |
| ---------------------- |--------------------------------------------------------| ----------- |
| Flesch Reading Ease    | 100 (very easy read) to 0 (extremely difficult read)   | 60          |
| Gunning Fog            | 6 (very easy read) to 17 (extremely difficult read)    | 8 or less   |
| SMOG Index             | 6 (very easy read) to 14 (extremely difficult read)    | 8 or less   |
| Auto. Read. Index      | 6 (very easy read) to 14 (extremely difficult read)    | 8 or less   |
| Coleman Liau Index     | 6 (very easy read) to 17 (extremely difficult read)    | 8 or less   |
| Linsear Write          | 0 (very easy read) to 11 (extremely difficult read)    | 8 or less   |
| Dale-Chall Readability | 4.9 (very easy read) to 9.9 (extremely difficult read) | 6.9 or less |

</details>

| Path                                 | FRE      | GF       | SMOG    | ARI     | CLI      | LWF     | DCRS     |
| ------------------------------------ | -------- | -------- | ------- | ------- | -------- | ------- | -------- |
| [README.md](# 'README.md')           | 45.15    | 10.16    | 13.4    | 21.7    | 11.77    | 15.3    | 7.42     |
| &nbsp;                               | 🔴 -9.78 | 🟢 -1.26 | 🔴 +2.2 | 🟢 -1.2 | 🔴 +1.04 | 🔴 +1.8 | 🟢 -1.21 |
| [new-feature.md](# 'new-feature.md') | 5.15     | 14.23    | 0       | 13.7    | 17.35    | 5.5     | 10.75    |
| &nbsp;                               | -        | -        | -       | -       | -        | -       | -        |

Overall average:

&nbsp; | FRE | GF | SMOG | ARI | CLI | LWF | DCRS
--- | --- | --- | --- | --- | --- | --- | ---
Average | 17.52 | 13.73 | 12.35 | 16.6 | 14.91 | 12.95 | 8.71
&nbsp; | 🔴 -37.41 | 🔴 +2.31 | 🔴 +1.15 | 🟢 -6.3 | 🔴 +4.18 | 🟢 -0.55 | 🔴 +0.08

</details>

## Readability scores

The [text-readability](https://github.com/clearnote01/readability) library is used to determine the complexity and ease of reading for your documentation files. These scores can be used as a guide to help you understand how changes may impact the readability of your documentation.

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
            - uses: Rebilly/readability-reporter@v1
              with:
                  github-token: ${{ secrets.GITHUB_TOKEN }}
                  glob: '**/*.md'
```

## Development

### Commands

| command     | description                                                                                                                                                                                                                                     |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `test`      | Run the unit tests                                                                                                                                                                                                                              |
| `lint`      | Run eslint on all files                                                                                                                                                                                                                         |
| `format`    | Run prettier on all files                                                                                                                                                                                                                       |
| `build`     | build the dist file. You are required to run this locally in order to build the dist before opening a PR.                                                                                                                                       |
| `run:local` | Run the action on two local folders, for testing and development. The first argument is the old ("base branch") folder and the sedcond argument is the new ("head branch") folder. For example `yarn run:local ./test-data/old ./test-data/new` |

### Testing

When developing the action, it can be useful to be able to run it locally rather than pushing a branch and running your development version on GitHub.

You can test the action locally by running the `run:local` command. This will report readability on two different folders, as if they were a pull request.

For example: `yarn run:local ./test-data/old ./test-data/new`
