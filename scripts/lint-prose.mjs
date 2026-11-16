#!/usr/bin/env node
/**
 * Reports writing-guideline violations in content/ (the mechanical subset of
 * https://github.com/vercel-labs/writing-guidelines plus this repo's host
 * conventions). Judgment calls -- fluff, accuracy, structure -- still need a
 * human; this catches what a regex can.
 *
 *   yarn lint-prose                  # summary per rule
 *   yarn lint-prose --verbose        # every occurrence, as file:line
 *   yarn lint-prose --rule em-dash   # one rule (repeatable)
 *   yarn lint-prose content/learn    # limit to paths
 *   yarn lint-prose --strict         # exit 1 on any violation (for CI)
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const words = (list) => new RegExp(`\\b(${list.join('|')})\\b`, 'gi');

// Rules that read prose: code fences, inline code, link targets and
// frontmatter are stripped first.
const PROSE_RULES = {
  'em-dash': { pattern: /—/g, message: 'em dash; use a colon, comma, period, or rephrase' },
  'banned-word': {
    pattern: words(['easy', 'easily', 'simple', 'simply', 'quick', 'quickly']),
    message: 'say what makes it easy: "one command", "default settings"',
  },
  filler: { pattern: words(['just', 'very', 'really']), message: 'filler word; cut it' },
  hype: {
    pattern: words([
      'seamless(ly)?', 'powerful', 'robust', 'cutting[- ]edge', 'revolutionar\\w*', 'unlock\\w*',
      'leverag\\w*', 'effortless\\w*', 'game[- ]chang\\w*', 'blazing\\w*', 'supercharg\\w*',
      'unparalleled', 'world[- ]class', 'best[- ]in[- ]class', 'state[- ]of[- ]the[- ]art',
      'empower\\w*', 'harness\\w*', 'delve', 'elevate', 'streamlin\\w*',
    ]),
    message: 'marketing language; state the concrete benefit',
  },
  weasel: {
    pattern: words(['significantly', 'typically', 'generally', 'often', 'usually']),
    message: 'weasel word; give the number or the condition',
  },
  'the-user': { pattern: /\bthe user\b/gi, message: 'address the reader as "you"' },
  ellipsis: { pattern: /(?<!\.)\.\.\.(?!\.)/g, message: 'use the ellipsis character …' },
  'vague-anchor': {
    pattern: /\[(here|click here|this link|link|this)\]\(/gi,
    message: 'anchor text should name the destination',
  },
};

// Rules that apply to code too: example hosts and the HTTP client.
const ANYWHERE_RULES = {
  'host-arweave-net': {
    pattern: /\barweave\.net\b/g,
    message: 'gateway examples use turbo-gateway.com',
  },
  'host-ardrive-net': { pattern: /\bardrive\.net\b/g, message: 'never use ardrive.net' },
  axios: { pattern: /\bfrom ["']axios["']|require\(["']axios["']\)/g, message: 'use fetch, not axios' },
};

const GENERIC_HEADINGS = new Set(['overview', 'introduction', 'summary', 'conclusion', 'notes', 'caveats', 'details', 'misc']);
const SMALL_WORDS = new Set(['a', 'an', 'the', 'and', 'or', 'for', 'to', 'of', 'in', 'on', 'with', 'vs', 'via', 'by', 'at', 'as', 'from', 'is']);

function headingIssues(text) {
  const issues = [];
  const plain = text.replace(/`[^`]*`/g, '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_]/g, '').trim();
  if (GENERIC_HEADINGS.has(plain.toLowerCase().replace(/:$/, ''))) {
    issues.push(['generic-heading', `"${plain}" says nothing; name what the section covers`]);
  }
  // Title Case: most words after the first are capitalized (acronyms and
  // CamelCase names like ArNS or TypeScript are not counted).
  const rest = (plain.match(/[A-Za-z][A-Za-z'-]*/g) ?? []).slice(1).filter((w) => !SMALL_WORDS.has(w.toLowerCase()));
  const titled = rest.filter((w) => /^[A-Z][a-z'-]*$/.test(w));
  if (rest.length >= 2 && titled.length >= 2 && titled.length >= 0.6 * rest.length) {
    issues.push(['title-case-heading', `"${plain}": headings use sentence case`]);
  }
  return issues;
}

function lintFile(rel) {
  const lines = readFileSync(path.join(ROOT, rel), 'utf8').split('\n');
  const found = [];
  const add = (rule, line, message) => found.push({ rule, file: rel, line, message });

  // Skip frontmatter.
  let i = lines[0]?.trim() === '---' ? lines.findIndex((l, n) => n > 0 && l.trim() === '---') + 1 : 0;
  let fence = null;
  let fenceStart = 0;
  for (; i < lines.length; i++) {
    const line = lines[i];
    const n = i + 1;
    const open = /^\s*(`{3,}|~{3,})\s*([\w+-]*)/.exec(line);
    if (fence) {
      if (open && open[1][0] === fence[0] && open[1].length >= fence.length && !open[2]) {
        if (n - fenceStart - 1 > 25) add('long-code-block', fenceStart, `${n - fenceStart - 1} lines; split it with prose (max 25)`);
        fence = null;
      }
    } else if (open) {
      fence = open[1];
      fenceStart = n;
      if (!open[2]) add('untagged-fence', n, 'code fence has no language tag');
    }

    for (const [rule, { pattern, message }] of Object.entries(ANYWHERE_RULES)) {
      if (line.match(pattern)) add(rule, n, message);
    }
    if (fence || open) continue;

    if (/^\s*---\s*$/.test(line)) add('horizontal-rule', n, 'no --- rules between sections');
    if (/^\s*(import|export)\s/.test(line)) continue;

    const heading = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (heading) {
      if (heading[1] === '#') add('body-h1', n, 'the frontmatter title is the H1; use ## here');
      for (const [rule, message] of headingIssues(heading[2])) add(rule, n, message);
    }

    const prose = line
      .replace(/`[^`]*`/g, '')
      .replace(/\]\([^)]*\)/g, '](')
      .replace(/\b(href|src)=["'][^"']*["']/g, '');
    for (const [rule, { pattern, message }] of Object.entries(PROSE_RULES)) {
      for (const m of prose.matchAll(pattern)) add(rule, n, rule === 'em-dash' ? message : `"${m[0]}": ${message}`);
    }
  }
  return found;
}

function listFiles(rel) {
  const abs = path.join(ROOT, rel);
  if (!statSync(abs).isDirectory()) return /\.mdx?$/.test(rel) ? [rel] : [];
  return readdirSync(abs).flatMap((name) => listFiles(path.join(rel, name)));
}

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const rules = args.flatMap((a, n) => (args[n - 1] === '--rule' ? [a] : []));
const targets = args.filter((a, n) => !a.startsWith('--') && args[n - 1] !== '--rule');

let issues = (targets.length ? targets : ['content']).flatMap(listFiles).flatMap(lintFile);
if (rules.length) issues = issues.filter((x) => rules.includes(x.rule));

if (flags.has('--verbose')) {
  for (const x of issues) console.log(`${x.file}:${x.line}: [${x.rule}] ${x.message}`);
  console.log();
}
const byRule = new Map();
for (const x of issues) {
  const entry = byRule.get(x.rule) ?? { count: 0, files: new Set() };
  entry.count++;
  entry.files.add(x.file);
  byRule.set(x.rule, entry);
}
for (const [rule, { count, files }] of [...byRule].sort((a, b) => b[1].count - a[1].count)) {
  console.log(`${rule.padEnd(20)} ${String(count).padStart(5)} in ${files.size} files`);
}
console.log(`\n${issues.length} writing-guideline issues${flags.has('--verbose') ? '' : ' (--verbose for locations)'}`);
if (flags.has('--strict') && issues.length) process.exit(1);
