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
 * Conway's Game of Life (B3/S23)
 *
 * The classic. Birth at 3 neighbors, survive at 2-3.
 * Produces still lifes, oscillators, gliders.
 */
export const currentRule: Rule = {
  name: "life",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    const alive = neighbors.filter(n => n > 0).length;
    if (center === 0) {
      return alive === 3 ? 1 : 0;
    } else {
      return (alive === 2 || alive === 3) ? 1 : 0;
    }
  }
};

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
