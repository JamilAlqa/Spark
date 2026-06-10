"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Motif from "@/components/Motif";
import type { Idea } from "@/types/idea";

export default function Rail({ ideas }: { ideas: Idea[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });
  const [dragging, setDragging] = useState(false);

  const slide = (dir: number) =>
    ref.current?.scrollBy({ left: dir * 306, behavior: "smooth" });

  return (
    <>
      <div className="flex items-end justify-between mb-5">
        <h2 className="t-section">Ideas in motion</h2>
        <div className="flex gap-2">
          <button className="arrow-btn" onClick={() => slide(-1)} aria-label="Previous">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="arrow-btn" onClick={() => slide(1)} aria-label="Next">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className={`rail ${dragging ? "dragging" : ""}`}
        onPointerDown={(e) => {
          drag.current = {
            down: true,
            startX: e.clientX,
            startScroll: ref.current?.scrollLeft ?? 0,
            moved: false,
          };
          setDragging(true);
        }}
        onPointerMove={(e) => {
          if (!drag.current.down || !ref.current) return;
          const dx = e.clientX - drag.current.startX;
          if (Math.abs(dx) > 6) drag.current.moved = true;
          ref.current.scrollLeft = drag.current.startScroll - dx;
        }}
        onPointerUp={() => {
          drag.current.down = false;
          setDragging(false);
        }}
        onPointerLeave={() => {
          drag.current.down = false;
          setDragging(false);
        }}
      >
        {ideas.map((d, i) => (
          <div
            key={d.slug}
            className="idea-card"
            style={{ background: d.palette.bg, color: d.palette.ink }}
            onClick={() => {
              if (!drag.current.moved) router.push(`/idea/${d.slug}`);
            }}
          >
            <span className="absolute left-6 top-[18px] mono text-[13px] font-semibold opacity-45">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="motif">
              <Motif name={d.motif} color={d.palette.accent} />
            </div>
            <div className="mt-auto relative">
              <p className="t-label mb-3" style={{ color: d.palette.accent }}>
                {d.type}
              </p>
              <h3 className="mb-2 text-2xl font-semibold tracking-tight leading-tight">
                {d.title}
              </h3>
              <p className="text-sm mb-5 opacity-70 leading-normal">{d.blurb}</p>
              <div className="flex gap-4 text-[12.5px] opacity-65">
                <span>{d.stats.forks} forks</span>
                <span>{d.stats.watching} watching</span>
                <span className="mono ml-auto">{d.updated}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="t-meta">Drag to explore · ideas surface by activity, not upvotes</p>
    </>
  );
}
