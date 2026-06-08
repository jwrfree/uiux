import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = "g:/30_PROJECTS/31_web_dev/uiux/public/images/img-card-teknovo.webp";
const output = "g:/30_PROJECTS/31_web_dev/uiux/public/images/img-card-teknovo-new.webp";

async function compress() {
  console.log("Compressing teknovo image...");
  await sharp(input)
    .resize(1200, null, { withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(output);
  console.log("Compression done.");
}

compress().catch(console.error);
