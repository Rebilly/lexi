// Modified from: https://github.com/slavcodev/coverage-monitor-action
import {getOctokit} from '@actions/github';
import {Context} from '@actions/github/lib/context';

type Octokit = ReturnType<typeof getOctokit>;

// Every comment written by our action will have this hidden
// header on top, and will be used to identify which comments
// to update/delete etc
const appendHiddenHeaderToComment = (body: string, hiddenHeader: string) =>
    hiddenHeader + body;

const listComments = async (
    client: Octokit,
    context: Context,
    prNumber: number,
    hiddenHeader: string
) => {
    const {data: existingComments} = await client.rest.issues.listComments({
        ...context.repo,
        issue_number: prNumber,
    });

    return existingComments.filter(({body}) => body?.startsWith(hiddenHeader));
};

const insertComment = (
    client: Octokit,
    context: Context,
    prNumber: number,
    body: string,
    hiddenHeader: string
) =>
    client.rest.issues.createComment({
        ...context.repo,
        issue_number: prNumber,
        body: appendHiddenHeaderToComment(body, hiddenHeader),
    });

const updateComment = (
    client: Octokit,
    context: Context,
    body: string,
    commentId: number,
    hiddenHeader: string
) =>
    client.rest.issues.updateComment({
        ...context.repo,
        comment_id: commentId,
        body: appendHiddenHeaderToComment(body, hiddenHeader),
    });

const deleteComments = (
    client: Octokit,
    context: Context,
    comments: {id: number}[]
) =>
    Promise.all(
        comments.map(({id}) =>
            client.rest.issues.deleteComment({
                ...context.repo,
                comment_id: id,
            })
        )
    );

export const upsertComment = async (
    client: Octokit,
    context: Context,
    prNumber: number,
    body: string,
    hiddenHeader: string
) => {
    const existingComments = await listComments(
        client,
        context,
        prNumber,
        hiddenHeader
    );
    const last = existingComments.pop();

    await deleteComments(client, context, existingComments);

    return last
        ? updateComment(client, context, body, last.id, hiddenHeader)
        : insertComment(client, context, prNumber, body, hiddenHeader);
};

export type FileStatuses = {
    added: string[];
    modified: string[];
    renamed: {
        from: string | undefined;
        to: string;
    }[];
};

// Given a PR number, returns 3 arrays: file names modified, added and renamed
export const getFileStatusesFromPR = async (
    client: Octokit,
    context: Context,
    prNumber: number
): Promise<FileStatuses> => {
    const {data: files} = await client.rest.pulls.listFiles({
        ...context.repo,
        pull_number: prNumber,
        // Pull the maximum number of files.
        // For PRs with over 100 files, we will have too many files which will create
        // a comment which is too large to post anyway.
        per_page: 100,
    });

    return {
        added: files
            .filter((file) => file.status === 'added')
            .map((file) => file.filename),
        modified: files
            .filter(
                (file) =>
                    file.status === 'modified' ||
                    (file.status === 'renamed' && file.changes > 0)
            )
            .map((file) => file.filename),
        renamed: files
            .filter((file) => file.status === 'renamed')
            .map((file) => ({from: file.previous_filename, to: file.filename})),
    };
};
