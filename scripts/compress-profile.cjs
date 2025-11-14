const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const INPUT = path.resolve(__dirname, "..", "public", "img_profile_jati.jpg");
const OUTPUT_DIR = path.resolve(__dirname, "..", "public");
const TARGET_WIDTH = 1400;

async function ensureInput() {
  await fs.promises.access(INPUT, fs.constants.R_OK).catch(() => {
    throw new Error(`Input file not found: ${INPUT}`);
  });
}

async function generateOutputs() {
  const baseName = path.basename(INPUT, path.extname(INPUT));
  const optimizedJpg = path.join(OUTPUT_DIR, `${baseName}.optimized.jpg`);
  const optimizedWebp = path.join(OUTPUT_DIR, `${baseName}.webp`);

  const pipeline = sharp(INPUT).resize({
    width: TARGET_WIDTH,
    withoutEnlargement: true,
  });

  await pipeline
    .clone()
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(optimizedJpg);

  await pipeline.clone().webp({ quality: 82 }).toFile(optimizedWebp);

  console.log("Compressed images created:");
  console.log(` - ${optimizedJpg}`);
  console.log(` - ${optimizedWebp}`);
}

async function main() {
  try {
    await ensureInput();
    await generateOutputs();
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
