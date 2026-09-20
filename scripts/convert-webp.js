import path from "node:path";
import { promises as fs } from "node:fs";
import sharp from "sharp";

const ASSETS_DIR = path.resolve("src/assets");
const RASTER_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);
const PROTECTED_FILES = new Set([
  "logo.png",
  "favicon.png",
  "apple-touch-icon.png",
]);

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(entryPath)));
    } else if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
}

async function convertImage(inputPath) {
  const fileName = path.basename(inputPath);
  if (PROTECTED_FILES.has(fileName.toLowerCase())) return false;

  const extension = path.extname(inputPath).toLowerCase();
  if (!RASTER_EXTENSIONS.has(extension)) return false;

  const outputPath = `${inputPath.slice(0, -extension.length)}.webp`;
  const temporaryPath = `${outputPath}.tmp-${process.pid}`;
  const metadata = await sharp(inputPath).metadata();
  const isGraphic = extension === ".png" || metadata.hasAlpha === true;
  const output = await sharp(inputPath)
    .webp({ quality: 85, lossless: isGraphic })
    .toBuffer();

  if (output.length === 0) {
    throw new Error(`Sharp generated an empty output for ${inputPath}`);
  }

  await fs.writeFile(temporaryPath, output);
  const outputStats = await fs.stat(temporaryPath);
  if (outputStats.size === 0) {
    await fs.rm(temporaryPath, { force: true });
    throw new Error(`WebP verification failed for ${inputPath}`);
  }

  await fs.rename(temporaryPath, outputPath);
  await fs.unlink(inputPath);
  return true;
}

const sourceFiles = await walk(ASSETS_DIR);
let converted = 0;
let skipped = 0;

for (const sourceFile of sourceFiles) {
  if (await convertImage(sourceFile)) converted += 1;
  else skipped += 1;
}

console.log(`Converted ${converted} images to WebP; skipped ${skipped} files.`);