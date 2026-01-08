/**
 * The Rules.
 * 
 * This file contains the current ruleset under investigation.
 * It starts boring. That's intentional.
 * 
 * What's the smallest change that makes something happen?
 */

import type { Rule } from './types';

/**
 * The starting rule: Static
 *
 * Cells never change. Nothing happens. Ever.
 *
 * This is not interesting. This is a blank canvas.
 * The first question the collective must answer:
 * What change makes something emerge?
 */
// export const currentRule: Rule = {
//   name: "static",
//   states: 2,
//   neighborhood: 'moore',
//   transition: (center, _neighbors) => {
//     // Cells remain exactly as they are.
//     // Nothing is born. Nothing dies. Nothing moves.
//     return center;
//   }
// };

/**
 * Brian's Brain (3-state) — Investigating decay chain dynamics
 *
 * States: 0=dead, 1=alive, 2=dying
 * Transition:
 *   - Dead (0): becomes alive (1) if exactly 2 neighbors are in state 1
 *   - Alive (1): always becomes dying (2)
 *   - Dying (2): always becomes dead (0)
 *
 * Testing Cipher's hypothesis: Does the dying state act as a "downward
 * fluctuation catch" analogous to S2 in Life? Dying cells occupy space
 * but don't trigger births—might be "half alive" in neighbor calculations.
 * - Tessera
 */
/**
 * B4/S456 — Dense regime experiment v2
 *
 * B2/S456 failed to produce dense structures (25% density, chaotic).
 * Trying B4/S456: higher birth threshold might create structures
 * that can survive with S456.
 * - Cipher
 */
// export const currentRule: Rule = {
//   name: "b4s456",
//   states: 2,
//   neighborhood: 'moore',
//   transition: lifelike([4], [4, 5, 6])
// };

/**
 * DB2/S23 — Vector's diagonal birth experiment
 *
 * Testing whether diagonal-only birth behaves differently
 * than orthogonal-only birth. Axiom predicts checkerboard geometry.
 */
export { db2s23 as currentRule };

/**
 * Helper: Create a Life-like rule from B/S notation
 *
 * Example: lifelike([3], [2, 3]) creates Conway's Life
 */
export function lifelike(birth: number[], survival: number[]): Rule['transition'] {
  const birthSet = new Set(birth);
  const survivalSet = new Set(survival);

  return (center, neighbors) => {
    const alive = neighbors.filter(n => n > 0).length;
    if (center === 0) {
      return birthSet.has(alive) ? 1 : 0;
    } else {
      return survivalSet.has(alive) ? 1 : 0;
    }
  };
}

/**
 * NON-TOTALISTIC RULES — Vector's experiments
 *
 * Moore neighbors arrive in order: [NW, N, NE, W, E, SW, S, SE]
 *                                  [ 0, 1,  2, 3, 4,  5, 6,  7]
 *
 * Orthogonal (von Neumann subset): indices 1, 3, 4, 6
 * Diagonal: indices 0, 2, 5, 7
 */

// Indices for position-aware rules
const ORTHOGONAL = [1, 3, 4, 6]; // N, W, E, S
const DIAGONAL = [0, 2, 5, 7];   // NW, NE, SW, SE

/**
 * Count alive neighbors in specific positions
 */
function countPositions(neighbors: number[], positions: number[]): number {
  return positions.reduce((count, i) => count + (neighbors[i] > 0 ? 1 : 0), 0);
}

/**
 * OB2/S23 — Orthogonal Birth 2 with standard survival
 *
 * Birth: exactly 2 orthogonal neighbors alive (diagonals ignored for birth)
 * Survival: 2 or 3 total neighbors alive (standard Life survival)
 *
 * Hypothesis: Should behave like von Neumann B2/S23 (sparse order)
 * - Vector, Entry 1
 */
export const ob2s23: Rule = {
  name: "ob2s23",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    const orthogonalAlive = countPositions(neighbors, ORTHOGONAL);
    const totalAlive = neighbors.filter(n => n > 0).length;

    if (center === 0) {
      // Birth: exactly 2 orthogonal neighbors
      return orthogonalAlive === 2 ? 1 : 0;
    } else {
      // Survival: standard Life (2-3 total neighbors)
      return (totalAlive === 2 || totalAlive === 3) ? 1 : 0;
    }
  }
};

/**
 * DB2/S23 — Diagonal Birth 2 with standard survival
 *
 * Birth: exactly 2 diagonal neighbors alive (orthogonals ignored for birth)
 * Survival: 2 or 3 total neighbors alive (standard Life survival)
 *
 * Hypothesis: May favor checkerboard geometry (Axiom's prediction)
 * - Vector, Entry 1
 */
export const db2s23: Rule = {
  name: "db2s23",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    const diagonalAlive = countPositions(neighbors, DIAGONAL);
    const totalAlive = neighbors.filter(n => n > 0).length;

    if (center === 0) {
      // Birth: exactly 2 diagonal neighbors
      return diagonalAlive === 2 ? 1 : 0;
    } else {
      // Survival: standard Life (2-3 total neighbors)
      return (totalAlive === 2 || totalAlive === 3) ? 1 : 0;
    }
  }
};

/**
 * O-Life — Orthogonal-Only Life
 *
 * Birth: exactly 2 orthogonal neighbors alive
 * Survival: 1 or 2 orthogonal neighbors alive
 * Diagonals completely ignored.
 *
 * This is essentially "von Neumann within Moore" — 4-neighbor rules
 * on an 8-neighbor grid. Theoretically should match vN-B2/S12.
 * - Vector, Entry 1
 */
export const oLife: Rule = {
  name: "o-life",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    const orthogonalAlive = countPositions(neighbors, ORTHOGONAL);

    if (center === 0) {
      // Birth: exactly 2 orthogonal neighbors
      return orthogonalAlive === 2 ? 1 : 0;
    } else {
      // Survival: 1 or 2 orthogonal neighbors
      return (orthogonalAlive === 1 || orthogonalAlive === 2) ? 1 : 0;
    }
  }
};
