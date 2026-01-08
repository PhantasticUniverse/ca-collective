/**
 * Analysis tools for measuring what's happening.
 */

import type { Grid, SimulationResult } from '../engine/types';

export interface AnalysisReport {
  density: number;
  entropy: number;
  symmetry: SymmetryReport;
  activity: number;
  periodicity: PeriodicityReport;
}

export interface SymmetryReport {
  horizontal: boolean;
  vertical: boolean;
  rotational180: boolean;
}

export interface PeriodicityReport {
  detected: boolean;
  period: number | null;
  confidence: number;
}

/**
 * Calculate Shannon entropy of the grid
 */
export function calculateEntropy(grid: Grid): number {
  const total = grid.width * grid.height;
  const counts = new Map<number, number>();
  
  for (let i = 0; i < grid.cells.length; i++) {
    const state = grid.cells[i];
    counts.set(state, (counts.get(state) || 0) + 1);
  }
  
  let entropy = 0;
  for (const count of counts.values()) {
    const p = count / total;
    if (p > 0) {
      entropy -= p * Math.log2(p);
    }
  }
  
  return entropy;
}

/**
 * Check for horizontal symmetry
 */
export function hasHorizontalSymmetry(grid: Grid): boolean {
  for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < Math.floor(grid.width / 2); x++) {
      const left = grid.cells[y * grid.width + x];
      const right = grid.cells[y * grid.width + (grid.width - 1 - x)];
      if (left !== right) return false;
    }
  }
  return true;
}

/**
 * Check for vertical symmetry
 */
export function hasVerticalSymmetry(grid: Grid): boolean {
  for (let y = 0; y < Math.floor(grid.height / 2); y++) {
    for (let x = 0; x < grid.width; x++) {
      const top = grid.cells[y * grid.width + x];
      const bottom = grid.cells[(grid.height - 1 - y) * grid.width + x];
      if (top !== bottom) return false;
    }
  }
  return true;
}

/**
 * Check for 180° rotational symmetry
 */
export function hasRotationalSymmetry(grid: Grid): boolean {
  for (let y = 0; y < Math.floor(grid.height / 2); y++) {
    for (let x = 0; x < grid.width; x++) {
      const a = grid.cells[y * grid.width + x];
      const b = grid.cells[(grid.height - 1 - y) * grid.width + (grid.width - 1 - x)];
      if (a !== b) return false;
    }
  }
  return true;
}

/**
 * Calculate activity: what fraction of cells changed?
 */
export function calculateActivity(before: Grid, after: Grid): number {
  let changed = 0;
  for (let i = 0; i < before.cells.length; i++) {
    if (before.cells[i] !== after.cells[i]) changed++;
  }
  return changed / before.cells.length;
}

/**
 * Detect periodicity in population history
 */
export function detectPeriodicity(
  populationHistory: number[],
  minPeriod: number = 1,
  maxPeriod: number = 50
): PeriodicityReport {
  if (populationHistory.length < maxPeriod * 2) {
    return { detected: false, period: null, confidence: 0 };
  }
  
  const recent = populationHistory.slice(-maxPeriod * 3);
  
  for (let period = minPeriod; period <= maxPeriod; period++) {
    let matches = 0;
    let comparisons = 0;
    
    for (let i = recent.length - 1; i >= period; i--) {
      if (recent[i] === recent[i - period]) {
        matches++;
      }
      comparisons++;
      if (comparisons >= period * 2) break;
    }
    
    const confidence = matches / comparisons;
    if (confidence > 0.95) {
      return { detected: true, period, confidence };
    }
  }
  
  return { detected: false, period: null, confidence: 0 };
}

/**
 * Generate a full analysis report
 */
export function analyze(result: SimulationResult): AnalysisReport {
  const grid = result.finalGrid;
  
  return {
    density: result.metrics.finalDensity,
    entropy: calculateEntropy(grid),
    symmetry: {
      horizontal: hasHorizontalSymmetry(grid),
      vertical: hasVerticalSymmetry(grid),
      rotational180: hasRotationalSymmetry(grid),
    },
    activity: result.history.length >= 2 
      ? calculateActivity(
          result.history[result.history.length - 2], 
          result.finalGrid
        )
      : 0,
    periodicity: detectPeriodicity(result.metrics.populationHistory),
  };
}
