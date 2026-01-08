/**
 * Visual renderer - outputs PNG images of grid states.
 * 
 * This is how researchers see what's happening.
 * Without this, we're blind.
 */

import sharp from 'sharp';
import type { Grid } from '../engine/types';
import { mkdirSync, existsSync } from 'fs';

const COLORS = {
  dead: { r: 20, g: 20, b: 30 },      // Dark blue-grey
  alive: { r: 120, g: 220, b: 180 },  // Soft green
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
      const color = cellValue > 0 ? COLORS.alive : COLORS.dead;
      
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
