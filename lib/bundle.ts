import fs from "fs";
import path from "path";
import type { Bundle, BundleNode } from "@/types/idea";

const IDEAS_DIR = path.join(process.cwd(), "content", "ideas");

/** The standard spaces of a Spark bundle, in display order. */
export const BUNDLE_SPACES = [
  "concept",
  "orchestration",
  "execution",
  "agents",
] as const;

/**
 * Read an idea's context bundle from content/ideas/<slug>/bundle.
 * Returns the directory tree plus the raw markdown of every file,
 * so the whole bundle ships to the page in one pass.
 */
export function getBundle(slug: string): Bundle | null {
  const root = path.join(IDEAS_DIR, slug, "bundle");
  if (!fs.existsSync(root)) return null;
  const files: Record<string, string> = {};
  const tree = readDir(root, "", files);
  return { tree, files };
}

function readDir(
  abs: string,
  rel: string,
  files: Record<string, string>
): BundleNode[] {
  const entries = fs
    .readdirSync(abs, { withFileTypes: true })
    .filter((e) => !e.name.startsWith("."));

  const nodes = entries.map((e): BundleNode => {
    const relPath = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) {
      return {
        name: e.name,
        path: relPath,
        kind: "dir",
        children: readDir(path.join(abs, e.name), relPath, files),
      };
    }
    files[relPath] = fs.readFileSync(path.join(abs, e.name), "utf-8");
    return { name: e.name, path: relPath, kind: "file" };
  });

  return nodes.sort(compareNodes.bind(null, rel === ""));
}

/** README first, then standard spaces in canonical order, then dirs, then files. */
function compareNodes(atRoot: boolean, a: BundleNode, b: BundleNode): number {
  return nodeRank(atRoot, a) - nodeRank(atRoot, b) || a.name.localeCompare(b.name);
}

function nodeRank(atRoot: boolean, n: BundleNode): number {
  if (atRoot) {
    if (n.name === "README.md") return 0;
    const space = (BUNDLE_SPACES as readonly string[]).indexOf(n.name);
    if (space !== -1) return 1 + space;
  }
  return n.kind === "dir" ? 10 : 20;
}

export function countBundleFiles(bundle: Bundle): number {
  return Object.keys(bundle.files).length;
}
