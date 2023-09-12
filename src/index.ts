import * as core from '@actions/core';
import {context, getOctokit} from '@actions/github';
import * as exec from '@actions/exec';
import {upsertComment, getFileStatusesFromPR} from './github';
import {calculateReadability} from './readability-files';
import {generateReport} from './report';
import {reportToComment} from './markdown';

const main = async () => {
    try {
        if (!context.payload.pull_request || !context.payload.repository) {
            core.setFailed('This action can only be run on pull requests');
            return;
        }

        // action parameters
        const token = core.getInput('github-token');
        const glob = core.getInput('glob');

        const baseBranchSha = context.payload.pull_request.base.sha;
        const headBranchSha = context.payload.pull_request.head.sha;
        const prNumber = context.payload.pull_request.number;

        const client = getOctokit(token);

        // Run readability on base branch
        console.log(`Checking out ${baseBranchSha}`);
        await exec.exec(`git checkout ${baseBranchSha}`);
        const oldReadability = calculateReadability(glob);

        // Run readability on head branch
        console.log(`Checking out ${headBranchSha}`);
        await exec.exec(`git checkout ${headBranchSha}`);
        const newReadability = calculateReadability(glob);

        const fileStatuses = await getFileStatusesFromPR(
            client,
            context,
            prNumber,
        );

        const report = generateReport(
            newReadability,
            oldReadability,
            fileStatuses,
        );

        // Only post a comment if there are results from markdown files
        // changed in this PR
        if (report.fileResults.length) {
            const repository = context.payload.repository.full_name;
            const commit = context.payload.pull_request.head.sha;

            const body = reportToComment(report, repository, commit);

            await upsertComment(
                client,
                context,
                context.payload.pull_request.number,
                body,
                `<!-- ${glob}-code-coverage-assistant -->`,
            );
        }
    } catch (error) {
        if (error instanceof Error) {
            core.setFailed(`Action failed with error: ${error.message}`);
        } else {
            core.setFailed(`Action failed.`);
        }
    }
};

main();
