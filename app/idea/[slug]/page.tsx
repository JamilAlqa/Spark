import Link from "next/link";
import { notFound } from "next/navigation";
import Motif from "@/components/Motif";
import IdeaTabs from "@/components/IdeaTabs";
import { getIdea, getIdeas } from "@/lib/ideas";
import { getBundle, countBundleFiles } from "@/lib/bundle";
import { getRepoActivity, repoName } from "@/lib/repo";
import type { BundleNode } from "@/types/idea";

export function generateStaticParams() {
  return getIdeas().map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const idea = getIdea(params.slug);
  return { title: idea ? `${idea.title} — Spark` : "Spark" };
}

export default async function IdeaPage({
  params,
}: {
  params: { slug: string };
}) {
  const idea = getIdea(params.slug);
  if (!idea) notFound();
  const bundle = getBundle(params.slug);
  const codeCommits = await getRepoActivity(idea.repo);

  return (
    <main className="max-w-5xl mx-auto px-6 pt-10 pb-24">
      <Link href="/" className="btn btn-quiet mb-6 -ml-3 inline-flex">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M19 12H5M11 18l-6-6 6-6" />
        </svg>
        All ideas
      </Link>

      {/* colored hero band */}
      <div
        className="hero-band mb-10"
        style={{ background: idea.palette.bg, color: idea.palette.ink }}
      >
        <div className="motif">
          <Motif name={idea.motif} color={idea.palette.accent} />
        </div>
        <div className="relative max-w-[560px]">
          <p className="t-label mb-4" style={{ color: idea.palette.accent }}>
            {idea.type}
          </p>
          <h1 className="t-display mb-4">{idea.title}</h1>
          <p className="t-body mb-7 opacity-75" style={{ color: "inherit" }}>
            {idea.tagline}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <button className="btn btn-dark" type="button">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="6" y1="3" x2="6" y2="15" />
                <circle cx="18" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <path d="M18 9a9 9 0 0 1-9 9" />
              </svg>
              Fork
            </button>
            <button className="btn" type="button">
              Watch · {idea.stats.watching}
            </button>
            <button className="btn" type="button">
              Clone bundle
            </button>
          </div>
        </div>
      </div>

      {/* meta strip */}
      <div className="flex flex-wrap items-center gap-x-7 gap-y-2 mb-10 t-meta">
        <span className="mono">
          {idea.hash} · {idea.updated}
        </span>
        <span>{idea.lineage}</span>
        <span>Started {idea.started}</span>
        <span>{idea.commits.length} changes</span>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-14">
        <IdeaTabs idea={idea} bundle={bundle} codeCommits={codeCommits} />

        {/* side rail */}
        <aside>
          <div className="pt-1 pb-5">
            <p className="t-label mb-4 text-faint">About</p>
            <div className="space-y-2.5 text-sm">
              <Stat k="Watching" v={idea.stats.watching} />
              <Stat k="Forks" v={idea.stats.forks} />
              <Stat k="Contributors" v={idea.stats.contributors} />
              <Stat k="Started" v={idea.started} />
            </div>
          </div>
          {bundle && (
            <div className="side-block">
              <p className="t-label mb-3 text-faint">
                Context bundle · {countBundleFiles(bundle)} files
              </p>
              <div>
                {bundle.tree.map((n) => (
                  <BundleEntry key={n.path} node={n} />
                ))}
              </div>
              <p className="t-meta mt-3">
                Contributions arrive as diffs on these files — merged like pull
                requests, credited forever.
              </p>
            </div>
          )}
          {idea.repo && (
            <div className="side-block">
              <p className="t-label mb-3 text-faint">Repository</p>
              <a
                href={idea.repo.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 py-1.5 text-[13px] text-gray2 hover:text-ink transition-colors"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="6" y1="3" x2="6" y2="15" />
                  <circle cx="18" cy="6" r="3" />
                  <circle cx="6" cy="18" r="3" />
                  <path d="M18 9a9 9 0 0 1-9 9" />
                </svg>
                <span className="mono">{repoName(idea.repo)}</span>
                {idea.repo.branch && (
                  <span className="vpill ml-auto">{idea.repo.branch}</span>
                )}
              </a>
              {codeCommits && codeCommits.length > 0 && (
                <p className="t-meta mt-1">
                  Last commit {codeCommits[0].when} ·{" "}
                  {codeCommits[0].msg.length > 40
                    ? codeCommits[0].msg.slice(0, 40) + "…"
                    : codeCommits[0].msg}
                </p>
              )}
              <p className="t-meta mt-3">
                This page holds the intent layer; the repository holds the
                build. Code activity appears under Changes.
              </p>
            </div>
          )}
          <div className="side-block">
            <p className="t-label mb-4 text-faint">Team</p>
            <div className="space-y-3.5">
              {idea.team.map((m) => (
                <div key={m.name} className="flex items-center gap-3">
                  <div className="avatar" style={{ background: m.color }}>
                    {m.init}
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-tight">{m.name}</p>
                    <p className="t-meta">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

function BundleEntry({ node }: { node: BundleNode }) {
  const isDir = node.kind === "dir";
  return (
    <div className="flex items-center gap-2.5 py-1.5 text-[13px] text-gray2">
      {isDir ? (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      ) : (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <polyline points="13 2 13 9 20 9" />
        </svg>
      )}
      <span className="mono">
        {node.name}
        {isDir ? "/" : ""}
      </span>
      {isDir && (
        <span className="t-meta ml-auto">{countNodes(node)}</span>
      )}
    </div>
  );
}

function countNodes(node: BundleNode): number {
  if (node.kind === "file") return 1;
  return (node.children ?? []).reduce((sum, c) => sum + countNodes(c), 0);
}

function Stat({ k, v }: { k: string; v: string | number }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray2">{k}</span>
      <span className="font-semibold">{v}</span>
    </div>
  );
}
