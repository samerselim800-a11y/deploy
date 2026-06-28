import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const inputDir = path.join(rootDir, "public", "frames");
const outputDir = path.join(rootDir, "public", "frames-webp");
const force = process.argv.includes("--force");
const qualityArg = process.argv.find((arg) => arg.startsWith("--quality="));
const quality = qualityArg ? Number(qualityArg.split("=")[1]) : 72;

if (!Number.isFinite(quality) || quality < 1 || quality > 100) {
  throw new Error("Quality must be a number between 1 and 100.");
}

await mkdir(outputDir, { recursive: true });

const files = (await readdir(inputDir))
  .filter((file) => file.toLowerCase().endsWith(".png"))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

let converted = 0;
let skipped = 0;
let inputBytes = 0;
let outputBytes = 0;

for (const file of files) {
  const inputPath = path.join(inputDir, file);
  const outputName = file.replace(/\.png$/i, ".webp");
  const outputPath = path.join(outputDir, outputName);

  inputBytes += (await stat(inputPath)).size;

  if (!force) {
    try {
      outputBytes += (await stat(outputPath)).size;
      skipped += 1;
      continue;
    } catch {
      // Missing output is expected on the first run.
    }
  }

  await sharp(inputPath)
    .webp({
      effort: 6,
      quality,
      smartSubsample: true,
    })
    .toFile(outputPath);

  outputBytes += (await stat(outputPath)).size;
  converted += 1;
}

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;
const saved = inputBytes > 0 ? 100 - (outputBytes / inputBytes) * 100 : 0;

console.log(`Frames found: ${files.length}`);
console.log(`Converted: ${converted}`);
console.log(`Skipped: ${skipped}`);
console.log(`PNG size: ${mb(inputBytes)}`);
console.log(`WebP size: ${mb(outputBytes)}`);
console.log(`Saved: ${saved.toFixed(1)}%`);
