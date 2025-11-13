#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

(async () => {
  const sharp = require('sharp');
  const src = path.resolve(__dirname, '..', 'icons', 'icon.svg');
  const out48 = path.resolve(__dirname, '..', 'icons', 'icon-48.png');
  const out96 = path.resolve(__dirname, '..', 'icons', 'icon-96.png');

  if (!fs.existsSync(src)) {
    console.error('Source SVG not found:', src);
    process.exit(1);
  }

  try {
    await sharp(src)
      .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(out48);

    await sharp(src)
      .resize(96, 96, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(out96);

    console.log('Icons generated:', path.basename(out48), path.basename(out96));
  } catch (err) {
    console.error('Failed to generate icons:', err);
    process.exit(1);
  }
})();
