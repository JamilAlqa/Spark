"use client";

import { useState } from "react";
import type { Bundle, CodeCommit, Idea } from "@/types/idea";
import BundleBrowser from "@/components/BundleBrowser";

type PaneId = "overview" | "bundle" | "changes" | "discussion";

export default function IdeaTabs({
  idea,
  bundle,
  codeCommits,
}: {
  idea: Idea;
  bundle: Bundle | null;
  codeCommits: CodeCommit[] | null;
}) {
  const [pane, setPane] = useState<PaneId>("overview");

  const tabs: { id: PaneId; label: string }[] = [
    { id: "overview", label: "Overview" },
    ...(bundle ? [{ id: "bundle" as const, label: "Bundle" }] : []),
    { id: "changes", label: "Changes" },
    { id: "discussion", label: "Discussion" },
  ];

  return (
    <div>
      <div className="flex border-b border-line mb-8">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`tab-btn ${pane === t.id ? "on" : ""}`}
            onClick={() => setPane(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {pane === "overview" && (
        <div>
          <div className="space-y-5 mb-12 t-body max-w-[600px]">
            {idea.desc.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <h3 className="t-title mb-5">Demos & trials</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {idea.demos.map((dm) => (
              <div key={dm.label} className="demo-card">
                <div
                  className="h-24 flex items-center justify-center"
                  style={{ background: idea.palette.bg }}
                >
                  <div className="w-[34px] h-[34px] rounded-full bg-white/75 flex items-center justify-center">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill={idea.palette.accent}>
                      <polygon points="6 3 21 12 6 21" />
                    </svg>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold mb-0.5">{dm.label}</p>
                  <p className="t-meta">{dm.note}</p>
                </div>
              </div>
            ))}
            <div className="demo-add">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span className="text-sm font-medium">Add a demo</span>
            </div>
          </div>
        </div>
      )}

      {pane === "bundle" && bundle && (
        <BundleBrowser bundle={bundle} palette={idea.palette} />
      )}

      {pane === "changes" && (
        <div>
          {idea.commits.map((c) => (
            <div key={c.hash} className="commit-row">
              <span className="mono text-xs" style={{ color: idea.palette.accent }}>
                {c.hash}
              </span>
              <div>
                <p className="text-sm font-medium mb-0.5">{c.msg}</p>
                <p className="t-meta">{c.meta}</p>
              </div>
              <span className="vpill">{c.tag}</span>
            </div>
          ))}
          <p className="t-meta mt-4">
            Every change is hashed and timestamped at publish. History is public
            and immutable.
          </p>

          {codeCommits && codeCommits.length > 0 && idea.repo && (
            <div className="mt-12">
              <h3 className="t-title mb-1">Code activity</h3>
              <p className="t-meta mb-4">
                From the linked repository — the execution layer downstream of
                this page.
              </p>
              {codeCommits.map((c) => (
                <a
                  key={c.hash}
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  className="commit-row hover:bg-white/60 transition-colors"
                >
                  <span className="mono text-xs text-faint">{c.hash}</span>
                  <div>
                    <p className="text-sm font-medium mb-0.5">{c.msg}</p>
                    <p className="t-meta">
                      {c.author} · {c.when}
                    </p>
                  </div>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-faint self-center">
                    <path d="M7 17L17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {pane === "discussion" && <Discussion />}
    </div>
  );
}

interface Comment {
  name: string;
  init: string;
  color: string;
  time: string;
  text: string;
}

function Discussion() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [draft, setDraft] = useState("");

  const post = () => {
    const text = draft.trim();
    if (!text) return;
    setComments((c) => [
      ...c,
      { name: "Jamil", init: "JA", color: "#161618", time: "just now", text },
    ]);
    setDraft("");
  };

  return (
    <div>
      <div className="space-y-6">
        {comments.length === 0 && (
          <p className="t-meta">No discussion yet — be the first.</p>
        )}
        {comments.map((c, i) => (
          <div key={i} className="flex gap-3">
            <div className="avatar" style={{ background: c.color }}>
              {c.init}
            </div>
            <div>
              <p className="text-sm">
                <span className="font-semibold">{c.name}</span>{" "}
                <span className="t-meta">· {c.time}</span>
              </p>
              <p className="text-sm text-gray2">{c.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-3 mt-8">
        <div className="avatar" style={{ background: "#161618" }}>
          JA
        </div>
        <textarea
          rows={2}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add to the discussion — or propose a change to the bundle…"
          className="flex-1 rounded-xl px-4 py-2.5 text-sm bg-white border border-line focus:border-ink outline-none resize-y"
        />
        <button className="btn btn-dark self-start" onClick={post}>
          Post
        </button>
      </div>
    </div>
  );
}
