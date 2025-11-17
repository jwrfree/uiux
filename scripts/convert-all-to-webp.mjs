import path from "path";
import fs from "fs/promises";
import sharp from "sharp";

const PUBLIC_DIR = path.resolve(process.cwd(), "public");
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png"];

async function findImageFiles(dir) {
  let imageFiles = [];
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        // Simple recursion, avoiding obviously large non-asset folders
        if (entry.name !== 'node_modules' && entry.name !== '.next' && entry.name !== '.git') {
          imageFiles = imageFiles.concat(await findImageFiles(fullPath));
        }
      } else if (IMAGE_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
        imageFiles.push(fullPath);
      }
    }
  } catch (error) {
    // Ignore directories that can't be read (e.g., due to permissions)
    if (error.code !== 'EACCES') {
      console.error(`Error reading directory ${dir}:`, error);
    }
  }
  return imageFiles;
}

async function convertImages() {
  console.log("Starting image conversion to WebP...");
  try {
    const files = await findImageFiles(PUBLIC_DIR);
    if (files.length === 0) {
      console.log("No new JPG/PNG images found to convert.");
      return;
    }

    console.log(`Found ${files.length} images to process.`);
    let convertedCount = 0;
    let skippedCount = 0;

    for (const file of files) {
      const outputFilename = file.replace(/\.(jpg|jpeg|png)$/i, ".webp");
      
      try {
        // Check if webp version already exists and is newer
        const fileStat = await fs.stat(file);
        try {
          const webpStat = await fs.stat(outputFilename);
          if (webpStat.mtime > fileStat.mtime) {
            // console.log(`⏩ Skipping, .webp is already up-to-date: ${path.basename(outputFilename)}`);
            skippedCount++;
            continue;
          }
        } catch (e) {
          // .webp file doesn't exist, so we proceed
        }

        await sharp(file)
          .webp({ quality: 82, effort: 4 })
          .toFile(outputFilename);
        console.log(`✅ Converted: ${path.basename(file)} -> ${path.basename(outputFilename)}`);
        convertedCount++;
      } catch (err) {
        console.error(`❌ Failed to convert ${file}:`, err);
      }
    }

    console.log("\nImage conversion process finished.");
    console.log(`- Converted: ${convertedCount}`);
    console.log(`- Skipped (already up-to-date): ${skippedCount}`);

  } catch (error) {
    console.error("An error occurred during the conversion process:", error);
    process.exit(1);
  }
}

convertImages();
