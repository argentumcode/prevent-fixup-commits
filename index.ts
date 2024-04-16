import * as core from "@actions/core";
import { context, getOctokit } from "@actions/github";

const FIXUP_REGEXP = /^(fixup|amend|squash)!/;

async function run(): Promise<void> {
  const githubToken = core.getInput("token", { required: true });
  const octokit = getOctokit(githubToken);
  const commits = await octokit.paginate(octokit.rest.pulls.listCommits, {
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.issue.number,
  });

  let error = false;
  for (const commit of commits) {
    if (commit.commit.message.match(FIXUP_REGEXP)) {
      core.error(
        `Commit message contains fixup!, amend! or squash!: ${commit.sha}`,
      );
      error = true;
    }
  }
  if (error) {
    throw new Error("Commit message contains fixup!, amend! or squash!");
  }
}

run().catch((error) => {
  if (error instanceof Error) core.setFailed(error.message);
  else {
    console.error(error);
    core.setFailed("unexpected error");
  }
});
