/**
 * Loads src/data/media.ts, requests every image URL in it the way a browser on
 * the live site would (with a cross-site Referer) and confirms each one
 * returns an image. Local paths are checked against the public/ folder.
 *
 *   npm run check:media
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { transformWithEsbuild } from "vite";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const file = resolve(root, "src/data/media.ts");

const { code } = await transformWithEsbuild(readFileSync(file, "utf8"), file, { loader: "ts", format: "esm" });
const mediaModule = await import(`data:text/javascript;base64,${Buffer.from(code).toString("base64")}`);

/** url -> { slots, authentic } */
const images = new Map();
const record = (url, slot, authentic) => {
  const entry = images.get(url) ?? { slots: [], authentic };
  entry.slots.push(slot);
  images.set(url, entry);
};

const visit = (value, path) => {
  if (!value || typeof value !== "object") return;
  if (typeof value.src === "string") {
    record(value.src, path, value.authentic);
    if (typeof value.thumb === "string") record(value.thumb, `${path} (thumb)`, value.authentic);
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    visit(child, Array.isArray(value) ? `${path}[${child?.id ?? key}]` : `${path}.${key}`);
  }
};
visit(mediaModule.media, "media");
record(mediaModule.FALLBACK_IMAGE, "FALLBACK_IMAGE", true);

const headers = {
  Referer: "https://kashasroyal.com/",
  Accept: "image/avif,image/webp,image/png,image/*,*/*;q=0.8",
  "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",
};

async function check(url) {
  if (!/^https?:\/\//.test(url)) {
    const local = join(root, "public", url);
    return existsSync(local) ? { ok: true, note: "local file" } : { ok: false, note: "missing from public/" };
  }
  try {
    const response = await fetch(url, { headers, signal: AbortSignal.timeout(25_000) });
    const type = response.headers.get("content-type") ?? "";
    const bytes = (await response.arrayBuffer()).byteLength;
    return {
      ok: response.ok && type.startsWith("image/") && bytes > 5_000,
      note: `${response.status} ${type} ${Math.round(bytes / 1024)} KB`,
    };
  } catch (error) {
    return { ok: false, note: error.message };
  }
}

const results = await Promise.all([...images].map(async ([url, entry]) => ({ url, ...entry, ...(await check(url)) })));

let failed = 0;
for (const result of results) {
  if (!result.ok) failed += 1;
  const kind = result.authentic ? "venue photo" : "placeholder";
  console.log(`${result.ok ? "PASS" : "FAIL"}  ${kind.padEnd(11)}  ${result.note.padEnd(26)}  ${result.slots.join(", ")}`);
  if (!result.ok) console.log(`      ${result.url}`);
}

const slots = Object.entries(mediaModule.media).filter(([key]) => key !== "gallery");
const real = slots.filter(([, image]) => image.authentic).length;
const gallery = mediaModule.media.gallery ?? [];
const realGallery = gallery.filter((image) => image.authentic).length;

console.log(`\n${results.length - failed}/${results.length} image URLs returned an image.`);
console.log(`Page slots: ${real} real venue photos, ${slots.length - real} placeholders.`);
console.log(`Gallery:    ${realGallery} real venue photos, ${gallery.length - realGallery} placeholders.`);
process.exit(failed ? 1 : 0);
