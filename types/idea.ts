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
  files: string[];
  stats: { watching: number; forks: number; contributors: number };
  team: TeamMember[];
}
