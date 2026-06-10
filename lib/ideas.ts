import fs from "fs";
import path from "path";
import type { Idea } from "@/types/idea";

const IDEAS_DIR = path.join(process.cwd(), "content", "ideas");

export function getIdeas(): Idea[] {
  const slugs = fs
    .readdirSync(IDEAS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  return slugs
    .map((slug) => readIdea(slug))
    .filter((i): i is Idea => i !== null)
    .sort((a, b) => a.order - b.order);
}

export function getIdea(slug: string): Idea | null {
  return readIdea(slug);
}

function readIdea(slug: string): Idea | null {
  const file = path.join(IDEAS_DIR, slug, "idea.json");
  if (!fs.existsSync(file)) return null;
  const raw = JSON.parse(fs.readFileSync(file, "utf-8"));
  return { ...raw, slug } as Idea;
}
