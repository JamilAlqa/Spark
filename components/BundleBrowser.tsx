"use client";

import { useState } from "react";
import type { Bundle, BundleNode, Palette } from "@/types/idea";
import Markdown from "@/components/Markdown";

/** File tree + rendered markdown for an idea's context bundle. */
export default function BundleBrowser({
  bundle,
  palette,
}: {
  bundle: Bundle;
  palette: Palette;
}) {
  const first = bundle.files["README.md"]
    ? "README.md"
    : Object.keys(bundle.files)[0];
  const [active, setActive] = useState(first);

  return (
    <div className="grid sm:grid-cols-[210px_1fr] gap-8">
      <div className="bundle-tree">
        <Tree nodes={bundle.tree} active={active} accent={palette.accent} onOpen={setActive} />
      </div>
      <div className="min-w-0 sm:border-l sm:border-line sm:pl-8">
        <p className="mono text-xs text-faint mb-5">bundle/{active}</p>
        <Markdown text={bundle.files[active] ?? ""} />
      </div>
    </div>
  );
}

function Tree({
  nodes,
  active,
  accent,
  onOpen,
  depth = 0,
}: {
  nodes: BundleNode[];
  active: string;
  accent: string;
  onOpen: (path: string) => void;
  depth?: number;
}) {
  return (
    <div>
      {nodes.map((n) =>
        n.kind === "dir" ? (
          <div key={n.path}>
            <div className="bundle-row" style={{ paddingLeft: depth * 14 }}>
              <FolderIcon />
              <span className="mono">{n.name}/</span>
            </div>
            <Tree
              nodes={n.children ?? []}
              active={active}
              accent={accent}
              onOpen={onOpen}
              depth={depth + 1}
            />
          </div>
        ) : (
          <button
            key={n.path}
            type="button"
            className={`bundle-row file ${active === n.path ? "on" : ""}`}
            style={{
              paddingLeft: depth * 14,
              color: active === n.path ? accent : undefined,
            }}
            onClick={() => onOpen(n.path)}
          >
            <FileIcon />
            <span className="mono">{n.name}</span>
          </button>
        )
      )}
    </div>
  );
}

function FileIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <polyline points="13 2 13 9 20 9" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}
