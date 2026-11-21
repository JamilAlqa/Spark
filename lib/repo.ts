import { execSync } from "child_process";
import type { CodeCommit, RepoLink } from "@/types/idea";

const COMMIT_LIMIT = 8;

/**
 * Commit activity for an idea's linked repository — the execution layer
 * downstream of the Spark page. Local repos are read with git directly;
 * remote repos go through the GitHub API. Returns null when there is no
 * link or the source is unreachable, so pages degrade quietly.
 */
export async function getRepoActivity(
  repo: RepoLink | undefined
): Promise<CodeCommit[] | null> {
  if (!repo) return null;
  return repo.local ? localCommits(repo) : githubCommits(repo);
}

function localCommits(repo: RepoLink): CodeCommit[] | null {
  try {
    const out = execSync(
      `git log -n ${COMMIT_LIMIT} --pretty=format:%h%x09%an%x09%aI%x09%s`,
      { cwd: process.cwd(), encoding: "utf-8" }
    );
    return out
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [hash, author, date, msg] = line.split("\t");
        return {
          hash,
          author,
          msg,
          when: timeAgo(date),
          url: `${repo.url.replace(/\/$/, "")}/commit/${hash}`,
        };
      });
  } catch {
    return null;
  }
}

async function githubCommits(repo: RepoLink): Promise<CodeCommit[] | null> {
  const m = repo.url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!m) return null;
  const [, owner, name] = m;
  const branch = repo.branch ? `&sha=${repo.branch}` : "";
  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${name}/commits?per_page=${COMMIT_LIMIT}${branch}`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 300 },
      }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as Array<{
      sha: string;
      html_url: string;
      commit: {
        message: string;
        author: { name: string; date: string } | null;
      };
    }>;
    return data.map((c) => ({
      hash: c.sha.slice(0, 7),
      msg: c.commit.message.split("\n")[0],
      author: c.commit.author?.name ?? "unknown",
      when: timeAgo(c.commit.author?.date ?? ""),
      url: c.html_url,
    }));
  } catch {
    return null;
  }
}

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const s = Math.max(0, (Date.now() - then) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  const mo = Math.floor(d / 30);
  if (mo < 12) return `${mo}mo ago`;
  return `${Math.floor(mo / 12)}y ago`;
}

/** "user/project" from a GitHub URL, for display. */
export function repoName(repo: RepoLink): string {
  const m = repo.url.match(/github\.com\/([^/]+\/[^/]+)/);
  return m ? m[1] : repo.url.replace(/^https?:\/\//, "");
}
