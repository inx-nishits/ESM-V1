import fs from "fs";
import path from "path";

const files = [];

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const s = fs.statSync(p);
    if (s.isDirectory() && f !== "node_modules" && f !== ".next") walk(p);
    else if (f.endsWith(".tsx")) files.push(p);
  }
}

walk("components");
walk("app");

const reps = [
  [/mx-auto max-w-\[var\(--container-max\)\] px-4 py-10 md:px-8 md:py-14/g, "site-container site-page"],
  [/mx-auto max-w-\[var\(--container-max\)\] px-4 py-16 md:px-8/g, "site-container site-page"],
  [/mx-auto max-w-\[var\(--container-max\)\] px-4 md:px-8/g, "site-container"],
  [/mx-auto w-full max-w-\[var\(--container-wide\)\] px-4 md:px-8/g, "site-container"],
  [/mx-auto w-full max-w-\[var\(--container-wide\)\]/g, "site-container"],
  [/mx-auto flex max-w-\[var\(--container-wide\)\]/g, "site-container flex"],
  [/mx-auto mt-3 h-0\.5 max-w-\[var\(--container-wide\)\]/g, "site-container mt-3 h-0.5"],
  [/relative mx-auto max-w-\[var\(--container-max\)\] px-4 py-14 md:px-8 md:py-20/g, "relative site-container py-14 md:py-20"],
  [/py-20 md:py-28/g, "site-section"],
  [/\bpy-16 md:py-20\b/g, "site-section"],
  [/relative overflow-hidden py-16 md:py-20/g, "site-section relative overflow-hidden"],
  [/bg-muted\/30 py-20 md:py-28/g, "site-section bg-muted/30"],
  [/bg-\[var\(--esm-navy-50\)\] py-16 md:py-20/g, "site-section bg-[var(--esm-navy-50)]"],
  [/bg-muted\/50 py-8 md:py-10/g, "site-section-compact bg-muted/50"],
  [/flex h-16 max-w-\[var\(--container-max\)\] items-center px-4 md:px-8/g, "site-container flex h-16 items-center"],
  [/flex h-9 max-w-\[var\(--container-max\)\] items-center justify-between px-4 text-xs md:px-8/g, "site-container flex h-9 items-center justify-between text-xs"],
  [/flex h-\[var\(--header-height\)\] max-w-\[var\(--container-max\)\] items-center gap-3 px-4 md:gap-4 md:px-8/g, "site-container flex h-[var(--header-height)] items-center gap-3 md:gap-4"],
  [/flex max-w-\[var\(--container-max\)\] items-center gap-3 px-4 py-2\.5 md:px-8/g, "site-container flex items-center gap-3 py-2.5"],
  [/flex max-w-\[var\(--container-max\)\] flex-col gap-4 md:flex-row md:items-center md:justify-between/g, "site-container flex flex-col gap-4 md:flex-row md:items-center md:justify-between"],
  [/max-w-\[var\(--container-max\)\] px-4 py-12 md:px-8 md:py-16/g, "site-container py-12 md:py-16"],
  [/grid max-w-\[var\(--container-max\)\] gap-6 px-4 py-8 md:grid-cols-4 md:px-8/g, "site-container grid gap-6 py-8 md:grid-cols-4"],
  [/max-w-\[var\(--container-max\)\] space-y-16 px-4 py-16 md:px-8/g, "site-container space-y-16 py-16"],
  [/lg:-ml-4 lg:pr-8/g, ""],
];

let updated = 0;
for (const file of files) {
  let content = fs.readFileSync(file, "utf8");
  const original = content;
  for (const [pattern, replacement] of reps) {
    content = content.replace(pattern, replacement);
  }
  if (content !== original) {
    fs.writeFileSync(file, content);
    updated++;
  }
}

console.log(`Updated ${updated} files`);
