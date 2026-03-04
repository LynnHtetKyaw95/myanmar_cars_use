import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = join(__dirname, 'public');

if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
}

const svgIcon = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="64" fill="#2563EB"/>
  <rect x="64" y="160" width="384" height="192" rx="24" fill="white"/>
  <circle cx="160" cy="256" r="40" fill="#2563EB"/>
  <circle cx="352" cy="256" r="40" fill="#2563EB"/>
  <rect x="96" y="320" width="320" height="32" rx="8" fill="#22C55E"/>
  <text x="256" y="440" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle">GoOrNo</text>
</svg>`;

async function generateIcons() {
  const sizes = [192, 512];
  
  for (const size of sizes) {
    await sharp(Buffer.from(svgIcon))
      .resize(size, size)
      .png()
      .toFile(join(publicDir, `icon-${size}.png`));
    console.log(`Generated icon-${size}.png`);
  }

  await sharp(Buffer.from(svgIcon))
    .resize(180, 180)
    .png()
    .toFile(join(publicDir, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');

  console.log('All icons generated successfully!');
}

generateIcons().catch(console.error);
