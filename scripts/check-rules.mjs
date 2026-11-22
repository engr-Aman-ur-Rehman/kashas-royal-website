/**
 * Guards the two strict business rules from the brief:
 *
 *   1. No public pricing: no currency symbols, amounts or per-guest rates.
 *   2. The email address and Instagram handle appear in the footer only.
 *
 * Scans the source, and the production build when `dist/` exists.
 *
 *   npm run check:rules
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const rel = (file) => relative(root, file).replaceAll("\\", "/");
const read = (file) => readFileSync(file, "utf8");

// Scan all text source and build files; compressed binary PDF downloads are excluded.
const TEXT_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".mjs", ".css", ".html", ".json", ".txt", ".svg", ".toml"]);

function walk(dir, files = []) {
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (TEXT_EXTENSIONS.has(extname(entry))) files.push(full);
  }
  return files;
}

const sourceFiles = [...walk(join(root, "src")), ...walk(join(root, "public")), join(root, "index.html")];
const distFiles = walk(join(root, "dist"));

/* ---------- Rule 1: no pricing ---------- */

const pricePatterns = [
  [/£|\u00a3|&pound;|&#163;|&#xa3;/i, "pound sign"],
  [/\bGBP\b/, "currency code"],
  [/[$€]\s?\d/, "currency amount", { skipInBundles: true }],
  [/\b\d+(\.\d+)?\s?(pence|quid)\b/i, "currency amount"],
  [/\bper[\s-](person|head|guest|plate|cover)\b/i, "per-guest rate"],
  [/\b(p\.p\.|pp)\b/, "per-guest rate", { skipInBundles: true }],
  [/\b(prices?|packages?|hire|rates?)\s+(start(s|ing)?\s+)?(from|at)\s+(just\s+|only\s+)?\d/i, "starting price"],
  [/\bfrom\s+(just\s+|only\s+)?[£$€]\s?\d/i, "starting price"],
];

// Minified bundles contain `$1`-style identifiers and short variable names, so
// the two checks that would misfire on code are skipped for built JS and CSS.
const bundlePatterns = pricePatterns.filter(([, , options]) => !options?.skipInBundles);

const problems = [];

function scanPricing(file, patterns) {
  const lines = read(file).split("\n");
  lines.forEach((line, index) => {
    for (const [pattern, label] of patterns) {
      const match = line.match(pattern);
      if (match) {
        const at = Math.max(0, match.index - 40);
        problems.push(`PRICING  ${rel(file)}:${index + 1}  ${label}: "${line.slice(at, match.index + 40).trim()}"`);
      }
    }
  });
}

for (const file of sourceFiles) scanPricing(file, pricePatterns);
for (const file of distFiles) {
  const isBundle = /\.(js|css)$/.test(file);
  scanPricing(file, isBundle ? bundlePatterns : pricePatterns);
}

/* ---------- Rule 2: email and Instagram in the footer only ---------- */

const DATA_FILE = "src/data/venueData.ts";
const FOOTER_FILE = "src/components/layout/Footer.tsx";
const contactPattern = /kashasroyal\.com|royalkashas|instagram|mailto:/i;

for (const file of sourceFiles) {
  const name = rel(file);
  const text = read(file);

  if (name !== DATA_FILE && name !== FOOTER_FILE) {
    text.split("\n").forEach((line, index) => {
      if (contactPattern.test(line)) problems.push(`CONTACT  ${name}:${index + 1}  email/Instagram outside the footer: "${line.trim().slice(0, 100)}"`);
    });
  }

  if (name !== DATA_FILE && name !== FOOTER_FILE && /\bfooterOnlyContact\b/.test(text)) {
    problems.push(`CONTACT  ${name}  imports footerOnlyContact (only ${FOOTER_FILE} may use it)`);
  }
}

// In the data file, the address and handle must live inside `footerOnlyContact`.
{
  const text = readFileSync(join(root, DATA_FILE), "utf8");
  const start = text.indexOf("export const footerOnlyContact");
  const end = text.indexOf("};", start);
  const outside = text.slice(0, start) + text.slice(end);
  outside.split("\n").forEach((line) => {
    if (/@kashasroyal\.com|@royalkashas|instagram\.com|mailto:/i.test(line)) {
      problems.push(`CONTACT  ${DATA_FILE}  email/Instagram value outside footerOnlyContact: "${line.trim().slice(0, 100)}"`);
    }
  });
  if (start === -1) problems.push(`CONTACT  ${DATA_FILE}  footerOnlyContact export not found`);
}

// Static files that ship as-is must not carry the email or Instagram at all.
for (const file of distFiles.filter((file) => !/\.js$/.test(file))) {
  const text = read(file);
  if (contactPattern.test(text)) problems.push(`CONTACT  ${rel(file)}  email/Instagram in a static build file`);
}

/* ---------- Report ---------- */

console.log(`Scanned ${sourceFiles.length} source files${distFiles.length ? ` and ${distFiles.length} build files` : " (no dist/ found; run npm run build to include the build)"}.`);

if (problems.length) {
  console.error(`\n${problems.length} problem(s) found:\n`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}

console.log("PASS  No pricing: no pound signs, currency amounts or per-guest rates.");
console.log(`PASS  Email and Instagram are defined once in ${DATA_FILE} and used only by ${FOOTER_FILE}.`);
