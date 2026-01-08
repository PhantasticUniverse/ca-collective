/**
 * Visual renderer - outputs PNG images of grid states.
 *
 * This is how researchers see what's happening.
 * Without this, we're blind.
 *
 * Extended for multi-state support by Tessera (2026-01-08)
 */

import sharp from 'sharp';
import type { Grid } from '../engine/types';
import { mkdirSync, existsSync } from 'fs';

// Multi-state color palette
// Index by cell state value (0 = dead, 1 = alive, 2+ = decay states)
const STATE_COLORS: Array<{r: number, g: number, b: number}> = [
  { r: 20, g: 20, b: 30 },      // 0: dead - dark blue-grey
  { r: 120, g: 220, b: 180 },   // 1: alive - soft green
  { r: 255, g: 180, b: 80 },    // 2: dying - warm orange
  { r: 200, g: 100, b: 100 },   // 3: fading - muted red
  { r: 120, g: 80, b: 140 },    // 4: dim - purple
  { r: 80, g: 80, b: 100 },     // 5: ghost - grey-blue
  { r: 60, g: 60, b: 80 },      // 6: faint - darker grey
  { r: 40, g: 40, b: 60 },      // 7: near-dead - very dark
];

// Legacy binary reference (backwards compatible)
const COLORS = {
  dead: STATE_COLORS[0],
  alive: STATE_COLORS[1],
};

/**
 * Render a grid to a PNG file
 */
export async function renderToPng(
  grid: Grid,
  outputPath: string,
  cellSize: number = 4
): Promise<void> {
  const width = grid.width * cellSize;
  const height = grid.height * cellSize;

  const pixels = Buffer.alloc(width * height * 3);

  for (let gy = 0; gy < grid.height; gy++) {
    for (let gx = 0; gx < grid.width; gx++) {
      const cellValue = grid.cells[gy * grid.width + gx];
      // Use multi-state palette, with fallback for high state values
      const color = cellValue < STATE_COLORS.length
        ? STATE_COLORS[cellValue]
        : STATE_COLORS[STATE_COLORS.length - 1];

      for (let py = 0; py < cellSize; py++) {
        for (let px = 0; px < cellSize; px++) {
          const pixelX = gx * cellSize + px;
          const pixelY = gy * cellSize + py;
          const pixelIndex = (pixelY * width + pixelX) * 3;

          pixels[pixelIndex] = color.r;
          pixels[pixelIndex + 1] = color.g;
          pixels[pixelIndex + 2] = color.b;
        }
      }
    }
  }

  const dir = outputPath.substring(0, outputPath.lastIndexOf('/'));
  if (dir && !existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  await sharp(pixels, {
    raw: {
      width,
      height,
      channels: 3
    }
  })
    .png()
    .toFile(outputPath);
}

/**
 * Generate a timestamped filename
 */
export function generateFilename(ruleName: string, researcher?: string): string {
  const now = new Date();
  const timestamp = now.toISOString()
    .replace(/[-:]/g, '')
    .replace('T', '-')
    .split('.')[0];
  const prefix = researcher ? `${researcher}-` : '';
  return `snapshots/${prefix}${timestamp}-${ruleName}.png`;
}
