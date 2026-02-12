import React from "react";

interface MarkdownRendererProps {
  text: string;
  messageId?: string;
}

export function MarkdownRenderer({ text, messageId }: MarkdownRendererProps) {
  const lines = text.split("\n");
  const elements: React.ReactElement[] = [];
  let key = 0;

  const renderInline = (value: string, keyPrefix: string) => {
    const tokenRegex =
      /(`[^`]+`|\[[^\]]+\]\((?:<[^>]+>|[^)\s]+)\)|\*\*[^*]+\*\*|\[(?:Source|Sources)\s+\d+\]|\[[A-Z0-9_]{3,}\]|\*[^*]+\*)/g;

    const parts = value.split(tokenRegex).filter((p) => p !== "");

    return parts.map((part, idx) => {
      const k = `${keyPrefix}_${idx}`;

      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={k}
            className="rounded bg-fd-muted px-1 py-0.5 font-mono text-[11px] text-fd-foreground"
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
        const angleMatch = part.match(/^\[([^\]]+)\]\(<([^>]+)>\)$/);
        const normalMatch = part.match(/^\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)$/);
        const match = angleMatch ?? normalMatch;
        if (match) {
          const label = match[1];
          const href = angleMatch ? angleMatch[2] : (match[2] ?? "").trim();
          if (href) {
            const isExternal = /^https?:\/\//i.test(href);
            return (
              <a
                key={k}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                className="cursor-pointer text-fd-primary underline underline-offset-2 hover:opacity-80"
              >
                {label}
              </a>
            );
          }
        }
      }

      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={k} className="font-semibold text-fd-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }

      {
        const sourceMatch = part.match(/^\[(?:Source|Sources)\s+(\d+)\]$/);
        if (sourceMatch) {
          const n = sourceMatch[1];
          const href = messageId ? `#arie-citation-${messageId}-${n}` : undefined;

          const sup = (
            <sup
              className="ml-0.5 mr-0.5 align-super text-[10px] font-medium text-fd-primary leading-none"
              aria-label={`Source ${n}`}
            >
              {n}
            </sup>
          );

          return href ? (
            <a
              key={k}
              href={href}
              className="cursor-pointer no-underline hover:opacity-80"
              aria-label={`Jump to source ${n}`}
            >
              {sup}
            </a>
          ) : (
            <span key={k}>{sup}</span>
          );
        }
      }

      if (part.startsWith("[") && part.endsWith("]")) {
        const token = part.slice(1, -1);
        if (/^[A-Z0-9_]{3,}$/.test(token)) {
          return (
            <span
              key={k}
              className="inline-flex items-center rounded-full border border-fd-border bg-fd-background/70 px-2 py-0.5 align-baseline font-mono text-[11px] text-fd-muted-foreground"
            >
              {token}
            </span>
          );
        }
      }

      if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
        if (!(part.startsWith("**") && part.endsWith("**"))) {
          return (
            <em key={k} className="italic">
              {part.slice(1, -1)}
            </em>
          );
        }
      }

      return <span key={k}>{part}</span>;
    });
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("# ")) {
      elements.push(
        <div
          key={key++}
          className="mt-3 text-sm font-semibold text-fd-foreground first:mt-0"
        >
          {renderInline(line.slice(2), `h1_${i}`)}
        </div>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <div
          key={key++}
          className="mt-3 text-sm font-semibold text-fd-foreground first:mt-0"
        >
          {renderInline(line.slice(3), `h2_${i}`)}
        </div>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <div
          key={key++}
          className="mt-2 text-sm font-medium text-fd-foreground first:mt-0"
        >
          {renderInline(line.slice(4), `h3_${i}`)}
        </div>
      );
    } else if (line.match(/^\d+\.\s/) || line.match(/^[-*]\s/)) {
      const isOrdered = line.match(/^\d+\.\s/);
      const listItems: string[] = [];
      let j = i;

      const markerRegex = isOrdered ? /^\d+\.\s/ : /^[-*]\s/;
      while (j < lines.length) {
        const current = lines[j] ?? "";

        if (markerRegex.test(current)) {
          listItems.push(current.replace(markerRegex, ""));
          j++;
          continue;
        }

        if (current.trim() === "") {
          let k = j + 1;
          while (k < lines.length && (lines[k] ?? "").trim() === "") k++;

          if (k < lines.length && markerRegex.test(lines[k] ?? "")) {
            j = k;
            continue;
          }

          break;
        }

        break;
      }

      if (isOrdered) {
        elements.push(
          <ol key={key++} className="list-decimal list-inside mb-2 space-y-1">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-fd-foreground">
                {renderInline(item, `ol_${i}_${idx}`)}
              </li>
            ))}
          </ol>
        );
      } else {
        elements.push(
          <ul key={key++} className="list-disc list-inside mb-2 space-y-1">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-fd-foreground">
                {renderInline(item, `ul_${i}_${idx}`)}
              </li>
            ))}
          </ul>
        );
      }

      i = j - 1;
    } else if (line.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      const closingFence = /^```\s*$/;
      while (i < lines.length && !closingFence.test(lines[i] ?? "")) {
        codeLines.push(lines[i] ?? "");
        i++;
      }
      elements.push(
        <pre
          key={key++}
          className="mb-2 overflow-x-auto rounded-md border border-fd-border bg-fd-muted p-3 text-[11px] leading-relaxed text-fd-foreground"
        >
          <code className="font-mono whitespace-pre">{codeLines.join("\n")}</code>
        </pre>
      );
    } else if (line.match(/^(?:    |\t)/)) {
      const indentedLines: string[] = [];
      let j = i;
      while (j < lines.length) {
        const current = lines[j] ?? "";
        if (current.trim() !== "" && !current.match(/^(?:    |\t)/)) break;
        indentedLines.push(current);
        j++;
      }
      elements.push(
        <pre
          key={key++}
          className="mb-2 overflow-x-auto rounded-md border border-fd-border bg-fd-muted p-3 text-[11px] leading-relaxed text-fd-foreground"
        >
          <code className="font-mono whitespace-pre">{indentedLines.join("\n")}</code>
        </pre>
      );
      i = j - 1;
    } else if (line.trim() === "") {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      elements.push(
        <p key={key++} className="text-sm leading-5 text-fd-foreground">
          {renderInline(line, `p_${i}`)}
        </p>
      );
    }
  }

  return <div className="space-y-2">{elements}</div>;
}

