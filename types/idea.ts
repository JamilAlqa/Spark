export type IdeaType = "Concept" | "Product" | "Research" | "Conversation";

export type MotifName =
  | "bolt"
  | "wheel"
  | "steam"
  | "network"
  | "arch"
  | "asterisk";

export interface Palette {
  /** card / band background */
  bg: string;
  /** darker accent for motif strokes, labels, hashes */
  accent: string;
  /** ink color used on top of bg */
  ink: string;
}

export interface Commit {
  hash: string;
  tag: string;
  msg: string;
  meta: string;
}

export interface Demo {
  label: string;
  note: string;
}

export interface TeamMember {
  init: string;
  color: string;
  name: string;
  role: string;
}

/** Link from a Spark page (intent layer) to its repo (execution layer). */
export interface RepoLink {
  /** GitHub URL, e.g. https://github.com/user/project */
  url: string;
  branch?: string;
  /** read commit activity from this working copy instead of the GitHub API
   *  (for the idea whose repo IS this codebase) */
  local?: boolean;
}

/** A commit pulled from the linked repository. */
export interface CodeCommit {
  hash: string;
  msg: string;
  author: string;
  /** relative time, e.g. "3h ago" */
  when: string;
  url: string;
}

/** A node in an idea's context bundle — the standard directory layout:
 *  README.md, concept/, orchestration/, execution/, agents/ */
export interface BundleNode {
  name: string;
  /** path relative to the bundle root, e.g. "concept/vision.md" */
  path: string;
  kind: "dir" | "file";
  children?: BundleNode[];
}

export interface Bundle {
  tree: BundleNode[];
  /** raw markdown, keyed by bundle-relative path */
  files: Record<string, string>;
}

export interface Idea {
  slug: string;
  order: number;
  title: string;
  type: IdeaType;
  motif: MotifName;
  palette: Palette;
  tagline: string;
  blurb: string;
  hash: string;
  updated: string;
  started: string;
  lineage: string;
  desc: string[];
  demos: Demo[];
  commits: Commit[];
  repo?: RepoLink;
  stats: { watching: number; forks: number; contributors: number };
  team: TeamMember[];
}
