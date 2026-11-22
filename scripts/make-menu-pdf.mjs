/**
 * Generates the stand-in sample menu at public/downloads/kashas-royal-menu.pdf.
 *
 * This exists only so the "Download Sample Menu" buttons work out of the box.
 * To publish the real menu, simply overwrite that PDF with your own file
 * (keep the same file name). You do not need to run this script again.
 *
 *   node scripts/make-menu-pdf.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const out = resolve(dirname(fileURLToPath(import.meta.url)), "../public/downloads/kashas-royal-menu.pdf");

// WinAnsi octal escapes: \225 bullet, \226 en dash, \351 e-acute.
const rgb = (hex) => hex.match(/\w\w/g).map((pair) => (parseInt(pair, 16) / 255).toFixed(3)).join(" ");
const OLIVE_DEEP = rgb("2B3319");
const OLIVE = rgb("4F5B31");
const GOLD = rgb("C89B3C");
const CHAMPAGNE = rgb("E5C572");
const IVORY = rgb("F9F7F2");
const INK = rgb("1A1C16");
const SLATE = rgb("55594B");

const ops = [];
const fill = (color) => ops.push(`${color} rg`);
const rect = (x, y, w, h) => ops.push(`${x} ${y} ${w} ${h} re f`);
const line = (x1, y1, x2, y2, color, width = 0.6) =>
  ops.push(`${color} RG ${width} w ${x1} ${y1} m ${x2} ${y2} l S`);
const text = (value, x, y, { font = "F1", size = 12, color = INK, spacing = 0 } = {}) =>
  ops.push(`BT /${font} ${size} Tf ${color} rg ${spacing} Tc ${x} ${y} Td (${value}) Tj ET`);

const LEFT = 64;
const RIGHT = 531;

fill(IVORY);
rect(0, 0, 595, 842);
fill(OLIVE_DEEP);
rect(0, 672, 595, 170);
text("Kashas Royal", LEFT, 752, { font: "F1", size: 40, color: CHAMPAGNE });
text("CATERING   \\225   VENUE   \\225   DECOR", LEFT, 722, { font: "F3", size: 8, color: GOLD, spacing: 2.4 });
line(LEFT, 702, RIGHT, 702, GOLD, 0.5);

text("Sample Starter Menu", LEFT, 612, { font: "F2", size: 30, color: INK });
text("A preview of our in-house starters, prepared by Kashas Events.", LEFT, 588, { font: "F3", size: 10, color: SLATE });

const sections = [
  ["MEAT & GRILL STARTERS", ["Lamb Kebab", "Chicken Tikka", "Chilli Chicken", "Chicken Leg", "Malai Tikka"]],
  ["CHAAT & VEGETARIAN STARTERS", ["Papri Chaat", "Samosa Chaat", "Aloo Tikki Chaat", "Chilli Paneer"]],
  [
    "ACCOMPANIMENTS & SERVICE",
    ["Fragrant Rice", "Fresh Naan", "Raita", "Mint Sauce", "Green Salad", "Welcome Drinks & Soft Drinks"],
  ],
];

let y = 544;
for (const [heading, items] of sections) {
  line(LEFT, y + 16, RIGHT, y + 16, GOLD, 0.5);
  text(heading, LEFT, y, { font: "F3", size: 8, color: OLIVE, spacing: 2 });
  y -= 26;
  for (const item of items) {
    text(item, LEFT, y, { font: "F1", size: 14, color: INK });
    y -= 20;
  }
  y -= 16;
}

line(LEFT, 112, RIGHT, 112, GOLD, 0.5);
text("Full 3-course bespoke menus are available through a private tasting and consultation.", LEFT, 92, {
  font: "F2",
  size: 11,
  color: SLATE,
});
text("12 BRIDGE CLOSE, ROMFORD, RM7 0AU   \\225   07931 813422", LEFT, 70, {
  font: "F3",
  size: 8,
  color: OLIVE,
  spacing: 1.6,
});

const content = ops.join("\n");
const font = (name) => `<< /Type /Font /Subtype /Type1 /BaseFont /${name} /Encoding /WinAnsiEncoding >>`;
const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> >>",
  `<< /Length ${Buffer.byteLength(content, "latin1")} >>\nstream\n${content}\nendstream`,
  font("Times-Roman"),
  font("Times-Italic"),
  font("Helvetica"),
  "<< /Title (Kashas Royal Sample Menu) /Author (Kashas Royal) >>",
];

let pdf = "%PDF-1.4\n";
const offsets = [];
objects.forEach((body, index) => {
  offsets.push(Buffer.byteLength(pdf, "latin1"));
  pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
});
const xrefAt = Buffer.byteLength(pdf, "latin1");
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
pdf += offsets.map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`).join("");
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info ${objects.length} 0 R >>\nstartxref\n${xrefAt}\n%%EOF\n`;

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, pdf, "latin1");
console.log(`Wrote ${out} (${Buffer.byteLength(pdf, "latin1")} bytes)`);
