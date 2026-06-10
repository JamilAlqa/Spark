import Link from "next/link";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[rgba(251,250,247,0.88)] border-b border-line/60">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2 L4.5 14 H11 L10 22 L19.5 9 H13 Z" />
          </svg>
          <span className="font-semibold tracking-tight">Spark</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <button className="btn btn-quiet" type="button">
            Search
          </button>
          <button className="btn btn-dark" type="button">
            New idea
          </button>
        </div>
      </div>
    </nav>
  );
}
