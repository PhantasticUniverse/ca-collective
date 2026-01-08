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
export const currentRule: Rule = {
  name: "b4s456",
  states: 2,
  neighborhood: 'moore',
  transition: lifelike([4], [4, 5, 6])
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
