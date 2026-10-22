import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function crc32(buf) {
  let table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    table[n] = c;
  }
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcInput = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(crcInput), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function createPng(width, height, isMaskable = false) {
  // RGBA buffer
  const rawScanlines = [];
  const cx = width / 2;
  const cy = height / 2;

  for (let y = 0; y < height; y++) {
    const scanline = Buffer.alloc(1 + width * 4);
    scanline[0] = 0; // Filter None

    for (let x = 0; x < width; x++) {
      const offset = 1 + x * 4;

      // Base background: pure black #000000
      let r = 0, g = 0, b = 0, a = 255;

      // Normalized coordinates -1 to 1
      const nx = (x - cx) / (width * 0.4);
      const ny = (y - cy) / (height * 0.4);
      const dist = Math.sqrt(nx * nx + ny * ny);

      // Book / lexicon open page icon
      // Left page outline
      const onLeftPage = (nx >= -0.7 && nx <= -0.05 && ny >= -0.55 && ny <= 0.55);
      const onRightPage = (nx >= 0.05 && nx <= 0.7 && ny >= -0.55 && ny <= 0.55);

      // Draw subtle rounded book card contour
      const borderThickness = 0.06;
      const isBorder = (
        (Math.abs(nx + 0.375) < 0.35 && (Math.abs(ny - 0.55) < borderThickness || Math.abs(ny + 0.55) < borderThickness || Math.abs(nx + 0.7) < borderThickness)) ||
        (Math.abs(nx - 0.375) < 0.35 && (Math.abs(ny - 0.55) < borderThickness || Math.abs(ny + 0.55) < borderThickness || Math.abs(nx - 0.7) < borderThickness)) ||
        (Math.abs(nx) < borderThickness && ny >= -0.55 && ny <= 0.55)
      );

      // Stylized lowercase 'l' on left page
      const isLetterL = (Math.abs(nx + 0.38) < 0.04 && ny >= -0.35 && ny <= 0.35) ||
                        (nx >= -0.38 && nx <= -0.22 && Math.abs(ny - 0.35) < 0.04);

      // Horizontal lines on right page representing lexicon text
      const isLine1 = (nx >= 0.18 && nx <= 0.58 && Math.abs(ny + 0.25) < 0.035);
      const isLine2 = (nx >= 0.18 && nx <= 0.58 && Math.abs(ny) < 0.035);
      const isLine3 = (nx >= 0.18 && nx <= 0.45 && Math.abs(ny - 0.25) < 0.035);

      if (isBorder || isLetterL) {
        r = 232; g = 232; b = 232; // #E8E8E8
      } else if (isLine1 || isLine2 || isLine3) {
        r = 136; g = 136; b = 136; // #888888
      } else if (onLeftPage || onRightPage) {
        r = 15; g = 15; b = 15; // #0F0F0F
      }

      scanline[offset] = r;
      scanline[offset + 1] = g;
      scanline[offset + 2] = b;
      scanline[offset + 3] = a;
    }
    rawScanlines.push(scanline);
  }

  const rawData = Buffer.concat(rawScanlines);
  const compressed = zlib.deflateSync(rawData);

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8 bit
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPng(192, 192));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPng(512, 512));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createPng(512, 512, true));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPng(180, 180));
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), createPng(32, 32));

console.log('All PWA icon assets generated successfully.');
