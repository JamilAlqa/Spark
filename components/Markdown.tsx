import React from "react";

/** Minimal markdown renderer for bundle files — headings, lists, code
 *  fences, blockquotes, hr, bold/italic/inline-code/links. No HTML. */
export default function Markdown({ text }: { text: string }) {
  return <div className="doc">{renderBlocks(text)}</div>;
}

function renderBlocks(text: string): React.ReactNode[] {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const out: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    // code fence
    if (line.startsWith("```")) {
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        buf.push(lines[i]);
        i++;
      }
      i++; // closing fence
      out.push(
        <pre key={key++}>
          <code>{buf.join("\n")}</code>
        </pre>
      );
      continue;
    }

    // heading
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      const Tag = (level === 1 ? "h1" : level === 2 ? "h2" : "h3") as "h1";
      out.push(<Tag key={key++}>{renderInline(h[2])}</Tag>);
      i++;
      continue;
    }

    // hr
    if (/^---+\s*$/.test(line)) {
      out.push(<hr key={key++} />);
      i++;
      continue;
    }

    // blockquote
    if (line.startsWith(">")) {
      const buf: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) {
        buf.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      out.push(<blockquote key={key++}>{renderInline(buf.join(" "))}</blockquote>);
      continue;
    }

    // lists
    const isUl = (l: string) => /^\s*[-*]\s+/.test(l);
    const isOl = (l: string) => /^\s*\d+\.\s+/.test(l);
    if (isUl(line) || isOl(line)) {
      const ordered = isOl(line);
      const match = ordered ? isOl : isUl;
      const items: React.ReactNode[] = [];
      while (i < lines.length && match(lines[i])) {
        items.push(
          <li key={items.length}>
            {renderInline(lines[i].replace(/^\s*([-*]|\d+\.)\s+/, ""))}
          </li>
        );
        i++;
      }
      const Tag = ordered ? "ol" : "ul";
      out.push(<Tag key={key++}>{items}</Tag>);
      continue;
    }

    // paragraph — gather until blank line or block start
    const buf: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("```") &&
      !lines[i].startsWith(">") &&
      !/^(#{1,4})\s/.test(lines[i]) &&
      !isUl(lines[i]) &&
      !isOl(lines[i])
    ) {
      buf.push(lines[i]);
      i++;
    }
    out.push(<p key={key++}>{renderInline(buf.join(" "))}</p>);
  }

  return out;
}

/** bold / italic / inline code / links */
function renderInline(text: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("**")) {
      out.push(<strong key={key++}>{tok.slice(2, -2)}</strong>);
    } else if (tok.startsWith("`")) {
      out.push(<code key={key++}>{tok.slice(1, -1)}</code>);
    } else if (tok.startsWith("[")) {
      const link = tok.match(/^\[([^\]]+)\]\(([^)]+)\)$/)!;
      out.push(
        <a key={key++} href={link[2]} target="_blank" rel="noreferrer">
          {link[1]}
        </a>
      );
    } else {
      out.push(<em key={key++}>{tok.slice(1, -1)}</em>);
    }
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
