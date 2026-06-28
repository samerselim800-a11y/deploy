import { readdir, mkdir, stat } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import ffmpegPath from "ffmpeg-static";

const rootDir = process.cwd();
const inputDir = path.join(rootDir, "src", "assets");
const outputDir = path.join(rootDir, "public", "videos");
const force = process.argv.includes("--force");
const maxHeightArg = process.argv.find((arg) => arg.startsWith("--max-height="));
const crfArg = process.argv.find((arg) => arg.startsWith("--crf="));
const maxHeight = maxHeightArg ? Number(maxHeightArg.split("=")[1]) : 720;
const crf = crfArg ? Number(crfArg.split("=")[1]) : 34;

if (!Number.isFinite(maxHeight) || maxHeight < 240) {
  throw new Error("max-height must be 240 or higher.");
}

if (!Number.isFinite(crf) || crf < 0 || crf > 63) {
  throw new Error("crf must be a number between 0 and 63.");
}

await mkdir(outputDir, { recursive: true });

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(ffmpegPath, args, { stdio: ["ignore", "ignore", "pipe"] });
    let stderr = "";

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(stderr || `ffmpeg exited with code ${code}`));
    });
  });
}

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

const files = (await readdir(inputDir))
  .filter((file) => file.toLowerCase().endsWith(".mp4"))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

let inputBytes = 0;
let outputBytes = 0;
let converted = 0;
let skipped = 0;

for (const file of files) {
  const inputPath = path.join(inputDir, file);
  const parsed = path.parse(file);
  const baseName = parsed.name.toLowerCase();
  const webmPath = path.join(outputDir, `${baseName}.webm`);
  const mp4Path = path.join(outputDir, `${baseName}.mp4`);
  const posterPath = path.join(outputDir, `${baseName}-poster.webp`);

  inputBytes += (await stat(inputPath)).size;

  const hasOutputs = (await exists(webmPath)) && (await exists(mp4Path)) && (await exists(posterPath));
  if (hasOutputs && !force) {
    outputBytes +=
      (await stat(webmPath)).size + (await stat(mp4Path)).size + (await stat(posterPath)).size;
    skipped += 1;
    continue;
  }

  const scaleFilter = `scale='trunc(min(iw,1280)/2)*2':'trunc(min(ih,${maxHeight})/2)*2':force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2`;

  await runFfmpeg([
    "-y",
    "-i",
    inputPath,
    "-an",
    "-vf",
    scaleFilter,
    "-c:v",
    "libvpx-vp9",
    "-crf",
    String(crf),
    "-b:v",
    "0",
    "-row-mt",
    "1",
    webmPath,
  ]);

  await runFfmpeg([
    "-y",
    "-i",
    inputPath,
    "-an",
    "-vf",
    scaleFilter,
    "-c:v",
    "libx264",
    "-crf",
    "27",
    "-preset",
    "medium",
    "-movflags",
    "+faststart",
    "-pix_fmt",
    "yuv420p",
    mp4Path,
  ]);

  await runFfmpeg([
    "-y",
    "-i",
    inputPath,
    "-frames:v",
    "1",
    "-vf",
    scaleFilter,
    "-c:v",
    "libwebp",
    "-quality",
    "72",
    posterPath,
  ]);

  outputBytes +=
    (await stat(webmPath)).size + (await stat(mp4Path)).size + (await stat(posterPath)).size;
  converted += 1;
}

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;
const saved = inputBytes > 0 ? 100 - (outputBytes / inputBytes) * 100 : 0;

console.log(`Videos found: ${files.length}`);
console.log(`Converted: ${converted}`);
console.log(`Skipped: ${skipped}`);
console.log(`Original MP4 size: ${mb(inputBytes)}`);
console.log(`Optimized outputs size: ${mb(outputBytes)}`);
console.log(`Saved vs all fallback files: ${saved.toFixed(1)}%`);
