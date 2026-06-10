import Link from "next/link";
import Rail from "@/components/Rail";
import { getIdeas } from "@/lib/ideas";

export default function Home() {
  const ideas = getIdeas();

  return (
    <main>
      <header className="max-w-6xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-20">
        <p className="t-label rise mb-6 text-accent">
          A home for ideas in the open
        </p>
        <h1 className="t-display rise max-w-2xl mb-6" style={{ animationDelay: "60ms" }}>
          Show what you&apos;re building, who with, and how.
        </h1>
        <p className="t-body rise max-w-xl mb-9" style={{ animationDelay: "120ms" }}>
          Every idea gets a living page — its story, demos, decisions, and team
          — with a timestamped history that makes sharing your proof, not your
          risk.
        </p>
        <div className="rise flex gap-3" style={{ animationDelay: "180ms" }}>
          <Link href="#gallery" className="btn btn-dark">
            Browse ideas
          </Link>
          <Link href="#gallery" className="btn">
            Why Spark
          </Link>
        </div>
      </header>

      <section id="gallery" className="max-w-6xl mx-auto px-6 pb-28">
        <Rail ideas={ideas} />
      </section>

      <footer className="max-w-6xl mx-auto px-6 pb-12">
        <div className="border-t border-line pt-8 flex items-center justify-between">
          <span className="t-meta">Spark — v0.1</span>
          <span className="t-meta">the public record for ideas</span>
        </div>
      </footer>
    </main>
  );
}
