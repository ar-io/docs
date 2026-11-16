/**
 * Type-checks the code samples in the docs against the SDK versions readers
 * install (the devDependencies pinned in package.json).
 *
 * A sample is checked when it is a ts/tsx/js/jsx fence that imports one of the
 * SDK packages below. Each one is compiled as its own module, with no strict
 * checks: the goal is to catch API drift (a method, option, export or import
 * path that does not exist), not to lint style.
 *
 * Samples are fragments, so names they never define (`signer`, `jwk`, ...)
 * are allowed -- unless the missing name is something an SDK exports, which
 * means the sample forgot to import it. Unknown third-party modules are
 * allowed too; a missing SDK module or subpath is an error.
 *
 * To opt a deliberate fragment out, put `{/* sample: skip *\/}` (MDX) or
 * `<!-- sample: skip -->` (Markdown) on the line before its fence.
 *
 * Known failures live in scripts/code-samples-baseline.json, keyed by file and
 * a hash of the sample, so CI fails only on new breakage. Fixing a sample
 * changes its hash and drops it from the baseline; rerun with
 * --update-baseline to record that.
 *
 *   yarn check-samples                    # fail on failures not in the baseline
 *   yarn check-samples --all              # list every failure
 *   yarn check-samples --update-baseline  # rewrite the baseline
 */
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";

const ROOT = path.resolve(__dirname, "..");
const BASELINE = path.join(ROOT, "scripts/code-samples-baseline.json");
const SOURCES = ["content", "public/SKILL.md"];

const SDK_PACKAGES = [
  "@ar.io/sdk",
  "@ar.io/wayfinder-core",
  "@ar.io/wayfinder-react",
  "@ardrive/turbo-sdk",
  "@ardrive/turbo-upload",
  "ardrive-core-js",
];
// Entry points whose exports count as "an SDK name" for missing-import checks.
const SDK_ENTRY_POINTS = [...SDK_PACKAGES, "@ar.io/sdk/web", "@ardrive/turbo-sdk/web"];

// React samples are often fenced as `typescript`, so every sample is parsed
// with JSX enabled.
const LANGS: Record<string, string> = {
  ts: "tsx",
  typescript: "tsx",
  tsx: "tsx",
  js: "jsx",
  javascript: "jsx",
  jsx: "jsx",
};

// Browser wallet globals the samples read from `window`.
const PRELUDE = `
interface Window {
  arweaveWallet?: any;
  ethereum?: any;
  solana?: any;
  phantom?: any;
}
`;

const isSdkSpecifier = (spec: string) =>
  SDK_PACKAGES.some((p) => spec === p || spec.startsWith(`${p}/`));

const IMPORTS_SDK = new RegExp(
  String.raw`(?:from\s+|import\s*\(\s*|require\s*\(\s*|import\s+)["'](` +
    SDK_PACKAGES.map((p) => p.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")).join("|") +
    String.raw`)(?:/[^"']*)?["']`,
);

interface Sample {
  file: string; // repo-relative
  line: number; // 1-based line of the first code line
  ext: string;
  code: string;
  key: string;
}

function listFiles(rel: string): string[] {
  const abs = path.join(ROOT, rel);
  if (!statSync(abs).isDirectory()) return [rel];
  return readdirSync(abs).flatMap((name) => {
    const child = path.join(rel, name);
    if (statSync(path.join(ROOT, child)).isDirectory()) return listFiles(child);
    return /\.mdx?$/.test(name) ? [child] : [];
  });
}

function extractSamples(file: string): Sample[] {
  const lines = readFileSync(path.join(ROOT, file), "utf8").split("\n");
  const samples: Sample[] = [];
  for (let i = 0; i < lines.length; i++) {
    const open = /^(\s*)(`{3,}|~{3,})\s*([\w-]*)/.exec(lines[i]);
    if (!open) continue;
    const [, indent, fence, lang] = open;
    let end = i + 1;
    while (end < lines.length && !new RegExp(`^\\s*${fence[0]}{${fence.length},}\\s*$`).test(lines[end])) end++;
    const body = lines.slice(i + 1, end).map((l) => (l.startsWith(indent) ? l.slice(indent.length) : l.trimStart()));
    const code = body.join("\n");
    const ext = LANGS[lang.toLowerCase()];
    let prev = i - 1;
    while (prev >= 0 && lines[prev].trim() === "") prev--;
    const skipped = prev >= 0 && /sample:\s*skip/.test(lines[prev]);
    if (ext && !skipped && IMPORTS_SDK.test(code)) {
      const hash = createHash("sha1").update(code).digest("hex").slice(0, 12);
      samples.push({ file, line: i + 2, ext, code, key: `${file}#${hash}` });
    }
    i = end;
  }
  return samples;
}

const COMPILER_OPTIONS: ts.CompilerOptions = {
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  lib: ["lib.es2022.d.ts", "lib.dom.d.ts", "lib.dom.iterable.d.ts"],
  types: ["node"],
  jsx: ts.JsxEmit.ReactJSX,
  allowJs: true,
  checkJs: true,
  strict: false,
  noImplicitAny: false,
  esModuleInterop: true,
  resolveJsonModule: true,
  skipLibCheck: true,
  noEmit: true,
};

function check(samples: Sample[]): Map<string, string[]> {
  const virtualDir = path.join(ROOT, "__samples__");
  const virtual = new Map<string, string>();
  samples.forEach((s, n) => virtual.set(path.join(virtualDir, `${n}.${s.ext}`), `${s.code}\nexport {};\n`));
  virtual.set(path.join(virtualDir, "prelude.d.ts"), PRELUDE);
  const exportsProbe = path.join(virtualDir, "exports.ts");
  virtual.set(
    exportsProbe,
    SDK_ENTRY_POINTS.map((p, n) => `import * as m${n} from "${p}";`).join("\n") + "\nexport {};\n",
  );

  const host = ts.createCompilerHost(COMPILER_OPTIONS);
  const { fileExists, readFile, getSourceFile } = host;
  host.fileExists = (f) => virtual.has(f) || fileExists(f);
  host.readFile = (f) => virtual.get(f) ?? readFile(f);
  host.getSourceFile = (f, lang, onError, create) =>
    virtual.has(f) ? ts.createSourceFile(f, virtual.get(f)!, lang, true) : getSourceFile(f, lang, onError, create);

  const program = ts.createProgram([...virtual.keys()], COMPILER_OPTIONS, host);
  const checker = program.getTypeChecker();

  // Every name an SDK entry point exports.
  const sdkNames = new Map<string, string>();
  const probe = program.getSourceFile(exportsProbe)!;
  probe.statements.forEach((stmt) => {
    if (!ts.isImportDeclaration(stmt)) return;
    const spec = (stmt.moduleSpecifier as ts.StringLiteral).text;
    const mod = checker.getSymbolAtLocation(stmt.moduleSpecifier);
    if (!mod) throw new Error(`cannot resolve ${spec}; is it installed?`);
    for (const sym of checker.getExportsOfModule(mod)) if (!sdkNames.has(sym.name)) sdkNames.set(sym.name, spec);
  });

  const failures = new Map<string, string[]>();
  samples.forEach((s, n) => {
    const sf = program.getSourceFile(path.join(virtualDir, `${n}.${s.ext}`))!;
    const diags = [...program.getSyntacticDiagnostics(sf), ...program.getSemanticDiagnostics(sf)];
    const messages: string[] = [];
    for (const d of diags) {
      let text = ts.flattenDiagnosticMessageText(d.messageText, " ");
      if (d.code === 2304 || d.code === 2552 || d.code === 18004) {
        // Cannot find name 'x' (or a `{ x }` shorthand with no `x` in scope).
        // Fine for fragments, unless an SDK exports it.
        const name = /'([^']+)'/.exec(text)?.[1] ?? "";
        if (!sdkNames.has(name)) continue;
        text += ` (exported by ${sdkNames.get(name)}: missing import?)`;
      }
      if (d.code === 2307 || d.code === 7016) {
        const spec = /'([^']+)'/.exec(text)?.[1] ?? "";
        if (!isSdkSpecifier(spec)) continue;
      }
      const line = d.start === undefined ? 0 : sf.getLineAndCharacterOfPosition(d.start).line;
      messages.push(`${s.file}:${s.line + line}: TS${d.code} ${text}`);
    }
    if (messages.length) failures.set(s.key, messages);
  });
  return failures;
}

function main() {
  const args = new Set(process.argv.slice(2));
  const samples = SOURCES.flatMap(listFiles).flatMap(extractSamples);
  const failures = check(samples);
  const baseline: string[] = (() => {
    try {
      return JSON.parse(readFileSync(BASELINE, "utf8"));
    } catch {
      return [];
    }
  })();

  if (args.has("--update-baseline")) {
    writeFileSync(BASELINE, JSON.stringify([...failures.keys()].sort(), null, 2) + "\n");
    console.log(`Baseline: ${failures.size} known-failing samples written to ${path.relative(ROOT, BASELINE)}`);
    return;
  }

  const known = new Set(baseline);
  const fresh = [...failures].filter(([key]) => !known.has(key));
  const fixed = baseline.filter((key) => !failures.has(key));
  const shown = args.has("--all") ? [...failures] : fresh;

  for (const [, messages] of shown) for (const m of messages) console.log(m);
  console.log(
    `\n${samples.length} samples checked: ${samples.length - failures.size} pass, ` +
      `${failures.size - fresh.length} known failures (baseline), ${fresh.length} new failures.`,
  );
  if (fixed.length)
    console.log(`${fixed.length} baseline entries no longer fail; run with --update-baseline to drop them.`);
  if (fresh.length) process.exit(1);
}

main();
