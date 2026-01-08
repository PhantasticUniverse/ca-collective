/**
 * ASCII renderer for quick terminal feedback.
 */

import type { Grid } from '../engine/types';

const CHARS = {
  dead: '·',
  alive: '█',
};

/**
 * Render grid to ASCII string
 */
export function renderToAscii(grid: Grid, maxWidth: number = 80): string {
  const lines: string[] = [];
  
  const scale = grid.width > maxWidth ? Math.ceil(grid.width / maxWidth) : 1;
  const displayWidth = Math.ceil(grid.width / scale);
  const displayHeight = Math.ceil(grid.height / scale);
  
  for (let dy = 0; dy < displayHeight; dy++) {
    let line = '';
    for (let dx = 0; dx < displayWidth; dx++) {
      const gx = Math.min(dx * scale + Math.floor(scale / 2), grid.width - 1);
      const gy = Math.min(dy * scale + Math.floor(scale / 2), grid.height - 1);
      const value = grid.cells[gy * grid.width + gx];
      line += value > 0 ? CHARS.alive : CHARS.dead;
    }
    lines.push(line);
  }
  
  return lines.join('\n');
}

/**
 * Render a small preview (for logging)
 */
export function renderPreview(grid: Grid, size: number = 20): string {
  const startX = Math.floor((grid.width - size) / 2);
  const startY = Math.floor((grid.height - size) / 2);
  
  const lines: string[] = [];
  for (let y = 0; y < size && startY + y < grid.height; y++) {
    let line = '';
    for (let x = 0; x < size && startX + x < grid.width; x++) {
      const gx = Math.max(0, startX + x);
      const gy = Math.max(0, startY + y);
      const value = grid.cells[gy * grid.width + gx];
      line += value > 0 ? CHARS.alive : CHARS.dead;
    }
    lines.push(line);
  }
  
  return lines.join('\n');
}

/**
 * Print grid info summary
 */
export function gridSummary(grid: Grid): string {
  let alive = 0;
  for (let i = 0; i < grid.cells.length; i++) {
    if (grid.cells[i] > 0) alive++;
  }
  const total = grid.width * grid.height;
  const density = (alive / total * 100).toFixed(1);
  
  return `Generation ${grid.generation} | ${grid.width}×${grid.height} | ${alive}/${total} alive (${density}%)`;
}
