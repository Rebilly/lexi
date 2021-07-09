import core from '@actions/core';
import github from '@actions/github';
import exec from '@actions/exec';
import {upsertComment, getFileStatusesFromPR} from './github';
import {calculateReadability} from './readability';
import {generateReport} from './report';
import {reportToComment} from './markdown';

const main = async () => {
    const {context = {}} = github || {};

    // action parameters
    const token = core.getInput('github-token');
    const glob = core.getInput('glob');

    const baseBranchRef = context.payload.pull_request.base.ref;
    const headBranchRef = context.payload.pull_request.head.ref;
    const prNumber = context.payload.pull_request.number;

    const client = github.getOctokit(token);

    // Run readability on base branch
    await exec.exec(`git fetch origin ${baseBranchRef}`);
    await exec.exec(`git checkout ${baseBranchRef}`);
    const oldReadability = calculateReadability(glob);

    // Run readability on head branch
    await exec.exec(`git fetch origin ${headBranchRef}`);
    await exec.exec(`git checkout ${headBranchRef}`);
    const newReadability = calculateReadability(glob);

    const fileStatuses = await getFileStatusesFromPR({
        client,
        context,
        prNumber,
    });

    const report = generateReport({
        newReadability,
        oldReadability,
        fileStatuses,
    });

    // Only post a comment if there are results from markdown files
    // changed in this PR
    if(report.fileResults.length)
    {
        const repository = context.payload.repository.full_name;
        const commit = context.payload.pull_request.head.sha;
    
        const body = reportToComment({report, repository, commit});
    
        await upsertComment({
            client,
            context,
            prNumber: context.payload.pull_request.number,
            body,
            hiddenHeader: `<!-- ${glob}-code-coverage-assistant -->`,
        });
    }
};

main().catch((err) => {
    console.log(err);
    core.setFailed(err.message);
});
