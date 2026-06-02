/**
 * optimize-images.mjs
 * Compress all project images using sharp.
 *
 * Usage:
 *   npm run optimize-images
 *
 * Strategy:
 *   • JPEG / JPG  → re-encode with mozjpeg, quality 82, strip metadata
 *   • PNG w/ alpha → compress as PNG (preserve transparency for logos)
 *   • PNG w/o alpha → convert to JPEG quality 82 (smaller file, no quality loss)
 *
 * Only targets: public/assets/projects/
 * Skips files already under 150 KB (already optimised enough).
 */

import sharp from "sharp";
import { readdir, stat, rename, unlink } from "fs/promises";
import { join, extname, basename, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const TARGET_DIR = join(ROOT, "public/assets/projects");
const SKIP_BELOW_KB = 150; // already small enough
const JPEG_QUALITY = 82;
const PNG_QUALITY = [0.7, 0.9]; // min/max for pngquant-style

// ── helpers ──────────────────────────────────────────────────────────────────

function kb(bytes) {
  return (bytes / 1024).toFixed(1) + " KB";
}

function pct(before, after) {
  const saved = ((before - after) / before) * 100;
  return saved > 0 ? `-${saved.toFixed(0)}%` : `+${Math.abs(saved).toFixed(0)}%`;
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else if (/\.(jpe?g|png|webp)$/i.test(e.name)) files.push(full);
  }
  return files;
}

// ── process one image ─────────────────────────────────────────────────────────

async function processImage(filePath) {
  const { size: sizeBefore } = await stat(filePath);

  if (sizeBefore < SKIP_BELOW_KB * 1024) {
    console.log(`  ⏭  ${basename(filePath)} — ${kb(sizeBefore)} (skipped, already small)`);
    return;
  }

  const ext = extname(filePath).toLowerCase();
  const image = sharp(filePath);
  const meta = await image.metadata();
  const tmp = filePath + ".tmp";

  try {
    if (ext === ".png") {
      const hasAlpha = meta.hasAlpha;

      if (hasAlpha) {
        // Keep PNG, compress with pngquant-compatible settings
        await image
          .png({ quality: 85, compressionLevel: 9, effort: 10 })
          .toFile(tmp);
      } else {
        // No transparency → convert to JPEG (much smaller)
        const jpgPath = filePath.replace(/\.png$/i, ".jpg");
        await image
          .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
          .toFile(tmp);

        const { size: sizeAfter } = await stat(tmp);
        await rename(tmp, jpgPath);
        await unlink(filePath);

        const label = `${basename(filePath)} → ${basename(jpgPath)}`;
        const tag = sizeAfter < sizeBefore ? "✅" : "⚠️";
        console.log(`  ${tag} ${label}  ${kb(sizeBefore)} → ${kb(sizeAfter)}  (${pct(sizeBefore, sizeAfter)})`);
        return;
      }
    } else {
      // JPEG / WEBP
      await image
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
        .toFile(tmp);
    }

    const { size: sizeAfter } = await stat(tmp);

    if (sizeAfter < sizeBefore) {
      await rename(tmp, filePath);
      console.log(`  ✅ ${basename(filePath)}  ${kb(sizeBefore)} → ${kb(sizeAfter)}  (${pct(sizeBefore, sizeAfter)})`);
    } else {
      // Compressed version is larger — keep original
      await unlink(tmp);
      console.log(`  ⏭  ${basename(filePath)} — ${kb(sizeBefore)} (kept original, recompressed was larger)`);
    }
  } catch (err) {
    // Clean up tmp on error
    await unlink(tmp).catch(() => {});
    throw err;
  }
}

// ── main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🔍 Scanning", TARGET_DIR.replace(ROOT, ""));
  const files = await walk(TARGET_DIR);
  console.log(`   Found ${files.length} image(s)\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const f of files) {
    const { size: before } = await stat(f);
    totalBefore += before;
    await processImage(f);
    // Re-stat in case file was replaced
    const afterPath = f.replace(/\.png$/i, ".jpg"); // might have been converted
    const { size: after } = await stat(afterPath).catch(() => stat(f));
    totalAfter += after;
  }

  console.log("\n─────────────────────────────────────");
  console.log(`Total: ${kb(totalBefore)} → ${kb(totalAfter)}  (${pct(totalBefore, totalAfter)} saved)`);
  console.log("Done ✓");
}

main().catch((err) => { console.error(err); process.exit(1); });
