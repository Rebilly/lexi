// Modified from: https://github.com/slavcodev/coverage-monitor-action

// Every comment written by our action will have this hidden
// header on top, and will be used to identify which comments
// to update/delete etc
const appendHiddenHeaderToComment = (body, hiddenHeader) => hiddenHeader + body;

const listComments = async ({client, context, prNumber, hiddenHeader}) => {
    const {data: existingComments} = await client.rest.issues.listComments({
        ...context.repo,
        issue_number: prNumber,
    });

    return existingComments.filter(({body}) => body.startsWith(hiddenHeader));
};

const insertComment = ({client, context, prNumber, body}, hiddenHeader) =>
    client.rest.issues.createComment({
        ...context.repo,
        issue_number: prNumber,
        body: appendHiddenHeaderToComment(body, hiddenHeader),
    });

const updateComment = ({client, context, body, commentId}, hiddenHeader) =>
    client.rest.issues.updateComment({
        ...context.repo,
        comment_id: commentId,
        body: appendHiddenHeaderToComment(body, hiddenHeader),
    });

const deleteComments = ({client, context, comments}) =>
    Promise.all(
        comments.map(({id}) =>
            client.rest.issues.deleteComment({
                ...context.repo,
                comment_id: id,
            })
        )
    );

export const upsertComment = async ({
    client,
    context,
    prNumber,
    body,
    hiddenHeader,
}) => {
    const existingComments = await listComments({
        client,
        context,
        prNumber,
        hiddenHeader,
    });
    const last = existingComments.pop();

    await deleteComments({
        client,
        context,
        comments: existingComments,
    });

    return last
        ? updateComment(
              {
                  client,
                  context,
                  body,
                  commentId: last.id,
              },
              hiddenHeader
          )
        : insertComment(
              {
                  client,
                  context,
                  prNumber,
                  body,
              },
              hiddenHeader
          );
};

// Given a PR number, returns 3 arrays: file names modified, added and renamed
export const getFileStatusesFromPR = async ({client, context, prNumber}) => {
    const {data: files} = await client.rest.pulls.listFiles({
        ...context.repo,
        pull_number: prNumber,
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
