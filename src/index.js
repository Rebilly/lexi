import core from '@actions/core';
import github from '@actions/github';
import {upsertComment} from './github';

const main = async () => {
    const {context = {}} = github || {};

    const token = core.getInput('github-token');
    const glob = core.getInput('glob');

    const client = github.getOctokit(token);

    await upsertComment({
        client,
        context,
        prNumber: context.payload.pull_request.number,
        body: `Test comment! ${glob}`,
        hiddenHeader: `<!-- ${glob}-code-coverage-assistant -->`,
    });
};

main().catch((err) => {
    console.log(err);
    core.setFailed(err.message);
});
