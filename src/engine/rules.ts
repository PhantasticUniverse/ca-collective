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
 * DB2/OS23 — Non-overlapping position sets experiment
 *
 * Testing: birth in diagonal space, survival in orthogonal space.
 * Positions don't overlap — what happens?
 */
// export { b3ds23 as currentRule };  // B3/DS23: Cipher's Moore birth + diagonal survival

/**
 * Life (B3/S23) — The canonical rule
 *
 * Temporal baseline for Epoch's analysis.
 * Birth: 3 neighbors. Survival: 2 or 3 neighbors.
 * - Epoch
 */
export const life: Rule = {
  name: "life-b3s23",
  states: 2,
  neighborhood: 'moore',
  transition: lifelike([3], [2, 3])
};

// export { db2ds23 as currentRule };  // Cipher: matched diagonal test

/**
 * B2/S23 — Dense Chaos (Epoch H1/H2 test)
 * Testing: Should show fluctuating activity, no decay.
 * - Meridian
 */
export const b2s23: Rule = {
  name: "b2s23",
  states: 2,
  neighborhood: 'moore',
  transition: lifelike([2], [2, 3])
};

// export { b2s23 as currentRule };  // Meridian: testing chaos for Epoch

/**
 * B4/S23 — Deep Order (Epoch H1/H2 test)
 * Testing: Should show exponential decay, short transient.
 * - Meridian
 */
export const b4s23: Rule = {
  name: "b4s23",
  states: 2,
  neighborhood: 'moore',
  transition: lifelike([4], [2, 3])
};

// export { b4s23 as currentRule };  // Meridian: testing order for Epoch

/**
 * B3/S234 — Dense Order (Epoch H1/H2 test)
 * Testing: Should show decay to ~50%, then stabilize.
 * - Meridian
 */
export const b3s234: Rule = {
  name: "b3s234",
  states: 2,
  neighborhood: 'moore',
  transition: lifelike([3], [2, 3, 4])
};

/**
 * B23/S23 — Birth at 2 OR 3 neighbors — Boundary Experiment
 *
 * Birth: 2 OR 3 neighbors (easier than B3-only, harder than B2-only)
 * Survival: 2 or 3 neighbors (standard Life survival)
 *
 * This is "B2.5" in spirit — testing the boundary between chaos (B2) and order (B3).
 * H1 predicts this will be chaotic (any B2 births create positive feedback).
 * H2 predicts intermediate behavior (some B3 structure with B2 growth).
 *
 * - Inflection, Entry 1
 */
export const b23s23: Rule = {
  name: "b23s23",
  states: 2,
  neighborhood: 'moore',
  transition: lifelike([2, 3], [2, 3])
};

/**
 * B34/S23 — Birth at 3 OR 4 neighbors
 *
 * Testing: Is B2 uniquely destructive, or does adding any birth condition destroy order?
 * B34 is "higher" than B3 (adding B4), unlike B23 which is "lower" (adding B2).
 *
 * Prediction: B34 should remain ordered if B2 is special.
 * - Inflection, Entry 2
 */
export const b34s23: Rule = {
  name: "b34s23",
  states: 2,
  neighborhood: 'moore',
  transition: lifelike([3, 4], [2, 3])
};

/**
 * VON NEUMANN BOUNDARY RULES — Inflection Entry 5
 *
 * Testing Geometric Heterogeneity Hypothesis.
 * vN is "pure" geometry (like hex). Prediction: no singularity.
 * - Inflection
 */
export const vnB2S23: Rule = {
  name: "vn-b2s23",
  states: 2,
  neighborhood: 'vonNeumann',
  transition: lifelike([2], [2, 3])
};

export const vnB12S23: Rule = {
  name: "vn-b12s23",
  states: 2,
  neighborhood: 'vonNeumann',
  transition: lifelike([1, 2], [2, 3])
};

export const vnB23S23: Rule = {
  name: "vn-b23s23",
  states: 2,
  neighborhood: 'vonNeumann',
  transition: lifelike([2, 3], [2, 3])
};

// export { b3s234 as currentRule };  // Meridian: testing dense order for Epoch
// export { db1os23 as currentRule };  // Cipher: testing very easy diagonal birth
// export { life as currentRule };  // Epoch: H3 seed sensitivity test
/**
 * Generations B2/S23 with N=3 decay — Testing H6
 *
 * H6: Survival can extend viable decay length.
 * Pure B2 + N=3 = extinction (Entry 5). Adding S23 might help.
 * - Tessera
 */
// export const currentRule: Rule = {
//   name: "gen-b2s23-n3",
//   states: 5,  // 0=dead, 1=alive, 2,3,4=decay
//   neighborhood: 'moore',
//   transition: generations([2], [2, 3], 3)
// };

// H6 control: Pure B2/N=3 (no survival) - should collapse
// export const currentRule: Rule = {
//   name: "gen-b2-n3",
//   states: 5,  // 0=dead, 1=alive, 2,3,4=decay
//   neighborhood: 'moore',
//   transition: generations([2], [], 3)  // Empty survival set
// };

/**
 * H6 Test: B2/S23 with N=3 decay
 * Hypothesis: Survival extends viable decay length.
 * - Meridian (testing for Tessera)
 */
// export const currentRule: Rule = {
//   name: "gen-b2s23-n3",
//   states: 5,  // 0=dead, 1=alive, 2,3,4=decay
//   neighborhood: 'moore',
//   transition: generations([2], [2, 3], 3)  // S23 survival
// };
/**
 * H7 Test: B2/S23 with N=5 decay — Verge
 *
 * Hypothesis (Tessera): With S23, there may be NO critical decay length.
 * N=3 produces 52.7% density, 68.2% activity. Does N=5 still work?
 */
/**
 * H7 Test Extreme: B2/S23 with N=10 decay — Verge
 *
 * N=5 still works (50.2%, 70.0%). Does N=10?
 * If yes, H7 is strongly confirmed.
 */
// export const currentRule: Rule = {
//   name: "gen-b2s23-n10",
//   states: 12,  // 0=dead, 1=alive, 2-11=decay
//   neighborhood: 'moore',
//   transition: generations([2], [2, 3], 10)  // S23 survival with 10 decay states
// };
// export { weightedLife as currentRule };  // Cipher: testing effective neighborhood hypothesis
// export { db2os34 as currentRule };  // Cipher: testing shifted survival in dense regime

/**
 * H8: S2+S3 Synergy Test in Multi-State — Tessera
 *
 * Cipher found S2 alone and S3 alone produce extinction in binary (B3/S2, B3/S3).
 * Only S23 together works. Does this synergy extend to multi-state?
 *
 * Test: gen-b2s2-n3 (S2 only) vs gen-b2s3-n3 (S3 only) vs gen-b2s23-n3 (S23)
 */
// export const currentRule: Rule = {
//   name: "gen-b2s2-n3",
//   states: 5,
//   neighborhood: 'moore',
//   transition: generations([2], [2], 3)  // S2 only, no S3
// };

// S3 only test (0.4% - extinction)
// export const currentRule: Rule = {
//   name: "gen-b2s3-n3",
//   states: 5,
//   neighborhood: 'moore',
//   transition: generations([2], [3], 3)  // S3 only, no S2
// };

// S234 test - broader survival
// export const currentRule: Rule = {
//   name: "gen-b2s234-n3",
//   states: 5,
//   neighborhood: 'moore',
//   transition: generations([2], [2, 3, 4], 3)
// };
// export { db2os2 as currentRule };  // Cipher: Entry 14 - S2 alone in non-totalistic

/**
 * H9 Test: Does decay length affect S2-only viability?
 * gen-b2s2-n3: 22.6% density
 * gen-b2s2-n10: ?
 * - Tessera
 */
// export const currentRule: Rule = {
//   name: "gen-b2s2-n10",
//   states: 12,
//   neighborhood: 'moore',
//   transition: generations([2], [2], 10)  // S2 only, N=10 decay
// };

/**
 * H10: Does B3/S23 work in Generations?
 * Binary B3/S23 = Life (5% sparse order)
 * Binary B2/S23 = chaos (35%)
 * Multi-state gen-b2s23-n3 = 52.7% dense dynamic
 * gen-b3s23-n3 = ???
 * - Tessera
 */
// export const currentRule: Rule = {
//   name: "gen-b3s23-n3",
//   states: 5,
//   neighborhood: 'moore',
//   transition: generations([3], [2, 3], 3)
// };

// Epoch Entry 6: Testing perpetual criticality hypothesis
// export const currentRule: Rule = {
//   name: "gen-b2s23-n3",
//   states: 5,
//   neighborhood: 'moore',
//   transition: generations([2], [2, 3], 3)
// };

// Epoch Entry 6: Life comparison run
// export { life as currentRule };

/**
 * H11: What happens below B2? Testing B1/S23 in Generations
 * B2 is the "dense critical point" in multi-state
 * B1 should be even denser/more chaotic?
 * - Tessera
 */
// export const currentRule: Rule = {
//   name: "gen-b1s23-n3",
//   states: 5,
//   neighborhood: 'moore',
//   transition: generations([1], [2, 3], 3)
// };

/**
 * H12: Von Neumann multi-state
 * In vN binary, B2/S23 = sparse order (~6%), B2/S12 = chaos (~47%)
 * What happens with vN Generations?
 * Hypothesis: vN B2 is AT critical (50%), so vN-gen-b2s23 should be sparse, not dense
 * - Tessera
 */
// export const currentRule: Rule = {
//   name: "vn-gen-b2s23-n3",
//   states: 5,
//   neighborhood: 'vonNeumann',
//   transition: generations([2], [2, 3], 3)
// };

/**
 * H12b: vN B1 = 25% of 4 = below critical
 * Should this produce dense dynamics like Moore gen-b2s23-n3?
 * - Tessera
 */
// export const currentRule: Rule = {
//   name: "vn-gen-b1s23-n3",
//   states: 5,
//   neighborhood: 'vonNeumann',
//   transition: generations([1], [2, 3], 3)
// };

// Epoch Entry 7: Testing vN AT-critical temporal profile
// export const currentRule: Rule = {
//   name: "vn-gen-b2s23-n3",
//   states: 5,
//   neighborhood: 'vonNeumann',
//   transition: generations([2], [2, 3], 3)
// };

// Epoch Entry 7: Testing hex BELOW-critical temporal profile
// export const currentRule: Rule = {
//   name: "hex-gen-b2s23-n3",
//   states: 5,
//   neighborhood: 'hexagonal',
//   transition: generations([2], [2, 3], 3)
// };

// Epoch Entry 7: Testing hex AT-critical temporal profile
// export const currentRule: Rule = {
//   name: "hex-gen-b3s23-n3",
//   states: 5,
//   neighborhood: 'hexagonal',
//   transition: generations([3], [2, 3], 3)
// };

/**
 * H13: Birth-Survival Compatibility Principle — Tessera
 *
 * Hypothesis: Dense dynamics require birth threshold B to align with survival S.
 * Cells born with B neighbors should immediately meet survival criteria.
 *
 * Test pairs:
 * - gen-b1s12-n3: B1 + S12 = COMPATIBLE (1 in [1,2])
 * - gen-b1s34-n3: B1 + S34 = INCOMPATIBLE (1 not in [3,4])
 * - gen-b3s34-n3: B3 + S34 = COMPATIBLE (3 in [3,4])
 *
 * Prediction: Compatible pairs produce higher density/activity.
 */
// export const currentRule: Rule = {
//   name: "gen-b1s12-n3",
//   states: 5,
//   neighborhood: 'moore',
//   transition: generations([1], [1, 2], 3)  // B1 + S12: compatible
// };

// H13 Test: B1/S34 - INCOMPATIBLE (1 not in [3,4])
// Result: 48.1% density, 40.2% activity - DYNAMIC (cells can't stabilize)
// export const currentRule: Rule = {
//   name: "gen-b1s34-n3",
//   states: 5,
//   neighborhood: 'moore',
//   transition: generations([1], [3, 4], 3)  // B1 + S34: incompatible
// };

// H13 Test: B3/S34 - COMPATIBLE (3 in [3,4])
// export const currentRule: Rule = {
//   name: "gen-b3s34-n3",
//   states: 5,
//   neighborhood: 'moore',
//   transition: generations([3], [3, 4], 3)  // B3 + S34: compatible
// };

// Epoch H7 Test: Does longer decay chain (N=10) produce longer transients?
// export const currentRule: Rule = {
//   name: "gen-b2s23-n10",
//   states: 12,
//   neighborhood: 'moore',
//   transition: generations([2], [2, 3], 10)  // B2 + S23, N=10 decay
// };

// Epoch H7 Test: N=20 decay chain
export const currentRule: Rule = {
  name: "gen-b2s23-n20",
  states: 22,
  neighborhood: 'moore',
  transition: generations([2], [2, 3], 20)  // B2 + S23, N=20 decay
};

/**
 * Testing gen-b2s23-n3 decay profile — Meridian
 * Epoch asked: Does gen-b2s23-n3 show power-law decay like Life?
 */
// export const currentRule: Rule = {
//   name: "gen-b2s23-n3",
//   states: 5,
//   neighborhood: 'moore',
//   transition: generations([2], [2, 3], 3)
// };
// export { life as currentRule };  // Epoch: H3 seed sensitivity test
// export { db2os12 as currentRule };  // Cipher: testing lower survival in dense regime

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
 * Helper: Create a Generations-style rule with decay chain
 *
 * States: 0=dead, 1=alive, 2...N+1=decay states
 * - Dead cells birth if alive neighbor count in birth set
 * - Alive cells survive if neighbor count in survival set, else enter decay
 * - Decay states progress to next state until returning to dead
 *
 * Example: generations([2], [], 1) = Brian's Brain (no survival)
 *          generations([2], [2,3], 3) = B2/S23 with 3-step decay
 * - Tessera
 */
export function generations(birth: number[], survival: number[], decayStates: number = 1): Rule['transition'] {
  const birthSet = new Set(birth);
  const survivalSet = new Set(survival);
  const maxDecay = decayStates + 1;  // e.g., decayStates=3 means states 2,3,4 are decay

  return (center, neighbors) => {
    const aliveNeighbors = neighbors.filter(n => n === 1).length;  // Only state 1 counts as alive

    if (center === 0) {
      // Dead cell: birth if neighbor count in birth set
      return birthSet.has(aliveNeighbors) ? 1 : 0;
    } else if (center === 1) {
      // Alive cell: survive if in survival set, else enter decay
      if (survivalSet.size > 0 && survivalSet.has(aliveNeighbors)) {
        return 1;  // Survives
      } else {
        return 2;  // Enter decay chain
      }
    } else {
      // Decay state: progress through chain
      return center < maxDecay ? center + 1 : 0;
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

/**
 * OB2/OS23 — True orthogonal-only B2/S23
 *
 * Birth: exactly 2 orthogonal neighbors alive
 * Survival: 2 or 3 orthogonal neighbors alive
 * Diagonals completely ignored for both birth AND survival.
 *
 * This is the true translation of vN-B2/S23 into Moore geometry.
 * Result (Axiom): 5.6% density, 5.8% activity — sparse order.
 * Confirms S23 universality extends to non-totalistic rules.
 * - Axiom
 */
export const ob2os23: Rule = {
  name: "ob2os23",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    const orthogonalAlive = countPositions(neighbors, ORTHOGONAL);

    if (center === 0) {
      // Birth: exactly 2 orthogonal neighbors
      return orthogonalAlive === 2 ? 1 : 0;
    } else {
      // Survival: 2 or 3 orthogonal neighbors
      return (orthogonalAlive === 2 || orthogonalAlive === 3) ? 1 : 0;
    }
  }
};

/**
 * DB2/OS23 — Non-Overlapping Position Sets
 *
 * Birth: exactly 2 diagonal neighbors alive
 * Survival: 2 or 3 orthogonal neighbors alive
 *
 * Birth and survival operate in NON-OVERLAPPING position sets.
 * Diagonals can trigger birth, but only orthogonals matter for survival.
 *
 * Hypothesis: This should produce qualitatively different dynamics
 * because birth and survival operate in geometrically distinct spaces.
 * - Vector, Entry 3
 */
export const db2os23: Rule = {
  name: "db2os23",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    const diagonalAlive = countPositions(neighbors, DIAGONAL);
    const orthogonalAlive = countPositions(neighbors, ORTHOGONAL);

    if (center === 0) {
      // Birth: exactly 2 diagonal neighbors
      return diagonalAlive === 2 ? 1 : 0;
    } else {
      // Survival: 2 or 3 orthogonal neighbors
      return (orthogonalAlive === 2 || orthogonalAlive === 3) ? 1 : 0;
    }
  }
};

/**
 * DB2/OS2 — Testing S2 alone in non-totalistic
 *
 * Birth: exactly 2 diagonal neighbors
 * Survival: exactly 2 orthogonal neighbors only (no S3)
 *
 * Testing: Does S2+S3 synergy extend to non-totalistic?
 * - Cipher, Entry 14
 */
export const db2os2: Rule = {
  name: "db2os2",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    const diagonalAlive = countPositions(neighbors, DIAGONAL);
    const orthogonalAlive = countPositions(neighbors, ORTHOGONAL);

    if (center === 0) {
      return diagonalAlive === 2 ? 1 : 0;
    } else {
      return orthogonalAlive === 2 ? 1 : 0;
    }
  }
};

/**
 * DB2/OS3 — Testing S3 alone in non-totalistic
 *
 * Birth: exactly 2 diagonal neighbors
 * Survival: exactly 3 orthogonal neighbors only (no S2)
 *
 * - Cipher, Entry 14
 */
export const db2os3: Rule = {
  name: "db2os3",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    const diagonalAlive = countPositions(neighbors, DIAGONAL);
    const orthogonalAlive = countPositions(neighbors, ORTHOGONAL);

    if (center === 0) {
      return diagonalAlive === 2 ? 1 : 0;
    } else {
      return orthogonalAlive === 3 ? 1 : 0;
    }
  }
};

/**
 * DB2/OS1 — Extreme low survival
 *
 * Birth: exactly 2 diagonal neighbors
 * Survival: exactly 1 orthogonal neighbor
 *
 * - Cipher, Entry 15
 */
export const db2os1: Rule = {
  name: "db2os1",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    const diagonalAlive = countPositions(neighbors, DIAGONAL);
    const orthogonalAlive = countPositions(neighbors, ORTHOGONAL);

    if (center === 0) {
      return diagonalAlive === 2 ? 1 : 0;
    } else {
      return orthogonalAlive === 1 ? 1 : 0;
    }
  }
};

/**
 * DB2/OS4 — Extreme high survival
 *
 * Birth: exactly 2 diagonal neighbors
 * Survival: exactly 4 orthogonal neighbors (maximum)
 *
 * - Cipher, Entry 15
 */
export const db2os4: Rule = {
  name: "db2os4",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    const diagonalAlive = countPositions(neighbors, DIAGONAL);
    const orthogonalAlive = countPositions(neighbors, ORTHOGONAL);

    if (center === 0) {
      return diagonalAlive === 2 ? 1 : 0;
    } else {
      return orthogonalAlive === 4 ? 1 : 0;
    }
  }
};

/**
 * DB2/OS0 — No survival (control)
 *
 * Birth: exactly 2 diagonal neighbors
 * Survival: 0 orthogonal neighbors only (isolated cells)
 *
 * - Cipher, Entry 15
 */
export const db2os0: Rule = {
  name: "db2os0",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    const diagonalAlive = countPositions(neighbors, DIAGONAL);
    const orthogonalAlive = countPositions(neighbors, ORTHOGONAL);

    if (center === 0) {
      return diagonalAlive === 2 ? 1 : 0;
    } else {
      return orthogonalAlive === 0 ? 1 : 0;
    }
  }
};

/**
 * DB2/OS234 — Broad survival
 *
 * Birth: exactly 2 diagonal neighbors
 * Survival: 2, 3, or 4 orthogonal neighbors
 *
 * - Cipher, Entry 15
 */
export const db2os234: Rule = {
  name: "db2os234",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    const diagonalAlive = countPositions(neighbors, DIAGONAL);
    const orthogonalAlive = countPositions(neighbors, ORTHOGONAL);

    if (center === 0) {
      return diagonalAlive === 2 ? 1 : 0;
    } else {
      return orthogonalAlive >= 2 && orthogonalAlive <= 4 ? 1 : 0;
    }
  }
};

/**
 * B3/OS23 — Moore Birth with Orthogonal-Only Survival
 *
 * Birth: exactly 3 total neighbors alive (standard Life birth)
 * Survival: 2 or 3 orthogonal neighbors alive (ignoring diagonals)
 *
 * Testing the REVERSE of diagonal stabilization:
 * Life structures are born with 3 neighbors (any position).
 * With OS23 survival, diagonal neighbors don't count for survival.
 *
 * Mismatch: births CAN use diagonals, survival CANNOT.
 * Structures born via diagonal neighbors can't use those for survival.
 *
 * Prediction: Sparser/less stable than Life.
 * - Cipher, Entry 7
 */
export const b3os23: Rule = {
  name: "b3os23",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    const orthogonalAlive = countPositions(neighbors, ORTHOGONAL);
    const totalAlive = neighbors.filter(n => n > 0).length;

    if (center === 0) {
      // Birth: standard Life (3 total neighbors)
      return totalAlive === 3 ? 1 : 0;
    } else {
      // Survival: 2 or 3 orthogonal neighbors only
      return (orthogonalAlive === 2 || orthogonalAlive === 3) ? 1 : 0;
    }
  }
};

/**
 * B3/DS23 — Moore Birth with Diagonal-Only Survival
 *
 * Birth: exactly 3 total neighbors alive (standard Life birth)
 * Survival: 2 or 3 diagonal neighbors alive (ignoring orthogonals)
 *
 * The complement of B3/OS23.
 * Mismatch: births CAN use orthogonals, survival CANNOT.
 *
 * Prediction: Similar sparseness to B3/OS23.
 * - Cipher, Entry 7
 */
export const b3ds23: Rule = {
  name: "b3ds23",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    const diagonalAlive = countPositions(neighbors, DIAGONAL);
    const totalAlive = neighbors.filter(n => n > 0).length;

    if (center === 0) {
      // Birth: standard Life (3 total neighbors)
      return totalAlive === 3 ? 1 : 0;
    } else {
      // Survival: 2 or 3 diagonal neighbors only
      return (diagonalAlive === 2 || diagonalAlive === 3) ? 1 : 0;
    }
  }
};

/**
 * DB2/DS23 — Matched Diagonal Rule
 *
 * Birth: exactly 2 diagonal neighbors alive
 * Survival: 2 or 3 diagonal neighbors alive
 *
 * Both birth and survival operate in diagonal positions only.
 * This is the diagonal equivalent of OB2/OS23 (matched orthogonal).
 *
 * Prediction: Should match OB2/OS23's sparse order (5-6% density)
 * because matched positions + S23 = sparse order (the universal pattern).
 * - Cipher, Entry 7
 */
export const db2ds23: Rule = {
  name: "db2ds23",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    const diagonalAlive = countPositions(neighbors, DIAGONAL);

    if (center === 0) {
      // Birth: exactly 2 diagonal neighbors
      return diagonalAlive === 2 ? 1 : 0;
    } else {
      // Survival: 2 or 3 diagonal neighbors
      return (diagonalAlive === 2 || diagonalAlive === 3) ? 1 : 0;
    }
  }
};

/**
 * OB2/DS23 — Non-Overlapping (Inverse of DB2/OS23)
 *
 * Birth: exactly 2 orthogonal neighbors alive
 * Survival: 2 or 3 diagonal neighbors alive
 *
 * The inverse of DB2/OS23. Birth in orthogonal, survival in diagonal.
 * Both are non-overlapping position sets.
 *
 * Prediction: Should also produce dense dynamics if separation principle holds.
 * - Cipher, Entry 8
 */
export const ob2ds23: Rule = {
  name: "ob2ds23",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    const orthogonalAlive = countPositions(neighbors, ORTHOGONAL);
    const diagonalAlive = countPositions(neighbors, DIAGONAL);

    if (center === 0) {
      // Birth: exactly 2 orthogonal neighbors
      return orthogonalAlive === 2 ? 1 : 0;
    } else {
      // Survival: 2 or 3 diagonal neighbors
      return (diagonalAlive === 2 || diagonalAlive === 3) ? 1 : 0;
    }
  }
};

/**
 * OB1/DS23 — Orthogonal Birth 1, Diagonal Survival
 *
 * Birth: exactly 1 orthogonal neighbor alive (very easy)
 * Survival: 2 or 3 diagonal neighbors alive
 *
 * Testing: Does directional asymmetry hold at B1?
 * - Cascade, Entry 1
 */
export const ob1ds23: Rule = {
  name: "ob1ds23",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    const orthogonalAlive = countPositions(neighbors, ORTHOGONAL);
    const diagonalAlive = countPositions(neighbors, DIAGONAL);

    if (center === 0) {
      return orthogonalAlive === 1 ? 1 : 0;
    } else {
      return (diagonalAlive === 2 || diagonalAlive === 3) ? 1 : 0;
    }
  }
};

/**
 * OB3/DS23 — Orthogonal Birth 3, Diagonal Survival
 *
 * Birth: exactly 3 orthogonal neighbors alive (hard)
 * Survival: 2 or 3 diagonal neighbors alive
 *
 * Testing: Does directional asymmetry hold at B3?
 * - Cascade, Entry 1
 */
export const ob3ds23: Rule = {
  name: "ob3ds23",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    const orthogonalAlive = countPositions(neighbors, ORTHOGONAL);
    const diagonalAlive = countPositions(neighbors, DIAGONAL);

    if (center === 0) {
      return orthogonalAlive === 3 ? 1 : 0;
    } else {
      return (diagonalAlive === 2 || diagonalAlive === 3) ? 1 : 0;
    }
  }
};

/**
 * DB3/OS23 — Diagonal Birth 3, Orthogonal Survival
 *
 * Birth: exactly 3 diagonal neighbors alive
 * Survival: 2 or 3 orthogonal neighbors alive
 *
 * Testing if higher diagonal birth (B3 instead of B2) still produces
 * dense dynamics in the diagonal→orthogonal direction.
 *
 * Prediction: Should be sparser than DB2/OS23 but still non-sparse.
 * - Cipher, Entry 9
 */
export const db3os23: Rule = {
  name: "db3os23",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    const diagonalAlive = countPositions(neighbors, DIAGONAL);
    const orthogonalAlive = countPositions(neighbors, ORTHOGONAL);

    if (center === 0) {
      // Birth: exactly 3 diagonal neighbors
      return diagonalAlive === 3 ? 1 : 0;
    } else {
      // Survival: 2 or 3 orthogonal neighbors
      return (orthogonalAlive === 2 || orthogonalAlive === 3) ? 1 : 0;
    }
  }
};

/**
 * DB1/OS23 — Diagonal Birth 1, Orthogonal Survival
 *
 * Birth: exactly 1 diagonal neighbor alive (very easy birth)
 * Survival: 2 or 3 orthogonal neighbors alive
 *
 * Testing: In totalistic rules, B1 = chaos. Does diagonal B1 also
 * produce chaos, or does the geometric separation tame it?
 *
 * Prediction: Likely chaos or very high density. B1 is extremely easy.
 * - Cipher, Entry 10
 */
export const db1os23: Rule = {
  name: "db1os23",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    const diagonalAlive = countPositions(neighbors, DIAGONAL);
    const orthogonalAlive = countPositions(neighbors, ORTHOGONAL);

    if (center === 0) {
      // Birth: exactly 1 diagonal neighbor
      return diagonalAlive === 1 ? 1 : 0;
    } else {
      // Survival: 2 or 3 orthogonal neighbors
      return (orthogonalAlive === 2 || orthogonalAlive === 3) ? 1 : 0;
    }
  }
};

/**
 * DB0/OS23 — Any diagonal birth (minimum 1)
 *
 * Birth: 1 or more diagonal neighbors alive (very easy)
 * Survival: 2 or 3 orthogonal neighbors alive
 *
 * - Cipher, Entry 17
 */
export const db0os23: Rule = {
  name: "db0os23",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    const diagonalAlive = countPositions(neighbors, DIAGONAL);
    const orthogonalAlive = countPositions(neighbors, ORTHOGONAL);

    if (center === 0) {
      return diagonalAlive >= 1 ? 1 : 0;
    } else {
      return (orthogonalAlive === 2 || orthogonalAlive === 3) ? 1 : 0;
    }
  }
};

/**
 * DB4/OS23 — All diagonals birth (very hard)
 *
 * Birth: exactly 4 diagonal neighbors alive (all diagonals)
 * Survival: 2 or 3 orthogonal neighbors alive
 *
 * - Cipher, Entry 17
 */
export const db4os23: Rule = {
  name: "db4os23",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    const diagonalAlive = countPositions(neighbors, DIAGONAL);
    const orthogonalAlive = countPositions(neighbors, ORTHOGONAL);

    if (center === 0) {
      return diagonalAlive === 4 ? 1 : 0;
    } else {
      return (orthogonalAlive === 2 || orthogonalAlive === 3) ? 1 : 0;
    }
  }
};

/**
 * DB2/OS34 — Dense Regime with Shifted Survival
 *
 * Birth: exactly 2 diagonal neighbors alive
 * Survival: 3 or 4 orthogonal neighbors alive (shifted from OS23)
 *
 * Testing: Does survival range matter in the dense regime?
 * - Cipher, Entry 11
 */
export const db2os34: Rule = {
  name: "db2os34",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    const diagonalAlive = countPositions(neighbors, DIAGONAL);
    const orthogonalAlive = countPositions(neighbors, ORTHOGONAL);

    if (center === 0) {
      // Birth: exactly 2 diagonal neighbors
      return diagonalAlive === 2 ? 1 : 0;
    } else {
      // Survival: 3 or 4 orthogonal neighbors
      return (orthogonalAlive === 3 || orthogonalAlive === 4) ? 1 : 0;
    }
  }
};

/**
 * DB2/OS12 — Dense Regime with Lower Survival
 *
 * Birth: exactly 2 diagonal neighbors alive
 * Survival: 1 or 2 orthogonal neighbors alive (lower than OS23)
 *
 * Testing: What happens with easier survival in the dense regime?
 * - Cipher, Entry 11
 */
export const db2os12: Rule = {
  name: "db2os12",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    const diagonalAlive = countPositions(neighbors, DIAGONAL);
    const orthogonalAlive = countPositions(neighbors, ORTHOGONAL);

    if (center === 0) {
      // Birth: exactly 2 diagonal neighbors
      return diagonalAlive === 2 ? 1 : 0;
    } else {
      // Survival: 1 or 2 orthogonal neighbors
      return (orthogonalAlive === 1 || orthogonalAlive === 2) ? 1 : 0;
    }
  }
};

/**
 * PURE GEOMETRY CRITICAL POINT TESTS — Tangent's experiments
 *
 * Testing whether 50% is truly critical in pure ortho/diag systems,
 * and mapping the full threshold spectrum.
 * - Tangent
 */

/**
 * OB1/OS23 — Orthogonal Birth 1 (25% threshold)
 */
export const ob1os23: Rule = {
  name: "ob1os23",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    const orthogonalAlive = countPositions(neighbors, ORTHOGONAL);
    if (center === 0) {
      return orthogonalAlive === 1 ? 1 : 0;
    } else {
      return (orthogonalAlive === 2 || orthogonalAlive === 3) ? 1 : 0;
    }
  }
};

/**
 * OB3/OS23 — Orthogonal Birth 3 (75% threshold)
 */
export const ob3os23: Rule = {
  name: "ob3os23",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    const orthogonalAlive = countPositions(neighbors, ORTHOGONAL);
    if (center === 0) {
      return orthogonalAlive === 3 ? 1 : 0;
    } else {
      return (orthogonalAlive === 2 || orthogonalAlive === 3) ? 1 : 0;
    }
  }
};

/**
 * DB1/DS23 — Diagonal Birth 1 (25% threshold)
 */
export const db1ds23: Rule = {
  name: "db1ds23",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    const diagonalAlive = countPositions(neighbors, DIAGONAL);
    if (center === 0) {
      return diagonalAlive === 1 ? 1 : 0;
    } else {
      return (diagonalAlive === 2 || diagonalAlive === 3) ? 1 : 0;
    }
  }
};

/**
 * DB3/DS23 — Diagonal Birth 3 (75% threshold)
 */
export const db3ds23: Rule = {
  name: "db3ds23",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    const diagonalAlive = countPositions(neighbors, DIAGONAL);
    if (center === 0) {
      return diagonalAlive === 3 ? 1 : 0;
    } else {
      return (diagonalAlive === 2 || diagonalAlive === 3) ? 1 : 0;
    }
  }
};

/**
 * HEXAGONAL RULES — Prism's experiments
 *
 * Hexagonal grid using odd-q offset coordinates.
 * 6 neighbors, all equidistant (no diagonal/orthogonal distinction).
 *
 * Generalized Critical Point Hypothesis predicts:
 * - Critical birth ≈ 0.4-0.5N = 2.4-3 for N=6
 * - B2 or B3 should be critical, B1 chaos, B4 frozen
 *
 * Testing S23 Universality: Does S23 work for sparse structures
 * in hexagonal geometry as it does in Moore and von Neumann?
 * - Prism
 */

/**
 * hex-B2/S23 — Predicted critical point
 *
 * Birth: exactly 2 neighbors alive
 * Survival: 2 or 3 neighbors alive
 *
 * Prediction: Should produce Life-like sparse dynamics (~5-7% density)
 * if the critical point hypothesis holds.
 * - Prism
 */
export const hexB2S23: Rule = {
  name: "hex-b2s23",
  states: 2,
  neighborhood: 'hexagonal',
  transition: (center, neighbors) => {
    const alive = neighbors.filter(n => n > 0).length;
    if (center === 0) {
      return alive === 2 ? 1 : 0;
    } else {
      return (alive === 2 || alive === 3) ? 1 : 0;
    }
  }
};

/**
 * hex-B3/S23 — Above critical point test
 *
 * Birth: exactly 3 neighbors alive
 * Survival: 2 or 3 neighbors alive
 *
 * Prediction: Should be more ordered than hex-B2/S23.
 * B3/6 = 50%, at upper edge of critical range.
 * - Prism
 */
export const hexB3S23: Rule = {
  name: "hex-b3s23",
  states: 2,
  neighborhood: 'hexagonal',
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
 * hex-B1/S12 — Below critical point test
 *
 * Birth: exactly 1 neighbor alive (very easy)
 * Survival: 1 or 2 neighbors alive
 *
 * Prediction: Should produce chaos (B1/6 = 17%, well below critical).
 * - Prism
 */
export const hexB1S12: Rule = {
  name: "hex-b1s12",
  states: 2,
  neighborhood: 'hexagonal',
  transition: (center, neighbors) => {
    const alive = neighbors.filter(n => n > 0).length;
    if (center === 0) {
      return alive === 1 ? 1 : 0;
    } else {
      return (alive === 1 || alive === 2) ? 1 : 0;
    }
  }
};

/**
 * hex-B4/S23 — Above critical point test
 *
 * Birth: exactly 4 neighbors alive
 * Survival: 2 or 3 neighbors alive
 *
 * Prediction: Should be frozen/sparse (B4/6 = 67%, above critical).
 * - Prism
 */
export const hexB4S23: Rule = {
  name: "hex-b4s23",
  states: 2,
  neighborhood: 'hexagonal',
  transition: (center, neighbors) => {
    const alive = neighbors.filter(n => n > 0).length;
    if (center === 0) {
      return alive === 4 ? 1 : 0;
    } else {
      return (alive === 2 || alive === 3) ? 1 : 0;
    }
  }
};

/**
 * hex-B2/S12 — Hexagonal Seeds analog
 *
 * Birth: exactly 2 neighbors alive
 * Survival: 1 or 2 neighbors alive (tight survival)
 *
 * Testing how survival affects dynamics at critical birth.
 * - Prism
 */
export const hexB2S12: Rule = {
  name: "hex-b2s12",
  states: 2,
  neighborhood: 'hexagonal',
  transition: (center, neighbors) => {
    const alive = neighbors.filter(n => n > 0).length;
    if (center === 0) {
      return alive === 2 ? 1 : 0;
    } else {
      return (alive === 1 || alive === 2) ? 1 : 0;
    }
  }
};

/**
 * hex-B2/S234 — Dense survival test
 *
 * Birth: exactly 2 neighbors alive
 * Survival: 2, 3, or 4 neighbors alive (permissive)
 *
 * Testing if S234 produces dense equilibrium in hexagonal
 * as it does in Moore (B2/S234 = 48% density).
 * - Prism
 */
export const hexB2S234: Rule = {
  name: "hex-b2s234",
  states: 2,
  neighborhood: 'hexagonal',
  transition: (center, neighbors) => {
    const alive = neighbors.filter(n => n > 0).length;
    if (center === 0) {
      return alive === 2 ? 1 : 0;
    } else {
      return (alive >= 2 && alive <= 4) ? 1 : 0;
    }
  }
};

/**
 * Weighted Life — Testing Effective Neighborhood Hypothesis
 *
 * Orthogonal neighbors count as 1.0, diagonal neighbors count as 0.5.
 * Effective neighborhood = 4 + 4*0.5 = 6.
 *
 * Birth: weighted count ≈ 3 (i.e., 2.5-3.5)
 * Survival: weighted count ≈ 2-3 (i.e., 1.5-3.5)
 *
 * If Moore's effective neighborhood is ~6, this should behave similarly
 * to totalistic Life (B3/S23) but with threshold at 50% (3/6).
 *
 * Prism's hypothesis: diagonal neighbors are "weaker" than orthogonal.
 * - Cipher, Entry 13
 */
export const weightedLife: Rule = {
  name: "weighted-life",
  states: 2,
  neighborhood: 'moore',
  transition: (center, neighbors) => {
    // Orthogonal neighbors count as 1.0
    const orthogonalAlive = countPositions(neighbors, ORTHOGONAL);
    // Diagonal neighbors count as 0.5
    const diagonalAlive = countPositions(neighbors, DIAGONAL);
    // Weighted count (effective neighborhood = 6)
    const weightedCount = orthogonalAlive + diagonalAlive * 0.5;

    if (center === 0) {
      // Birth: weighted exactly 3.0 (strict)
      return weightedCount === 3.0 ? 1 : 0;
    } else {
      // Survival: weighted 2.0-3.0 (strict range)
      return (weightedCount >= 2.0 && weightedCount <= 3.0) ? 1 : 0;
    }
  }
};

/**
 * gen-b2s23-n3 — Dense Critical Point (Multi-state)
 *
 * Birth: 2 neighbors alive
 * Survival: 2 or 3 neighbors alive
 * Decay: 3 steps (states 2,3,4)
 *
 * The dense critical point: 53% density, 69% activity, single attractor.
 * Testing temporal signature vs Life.
 * - Verge, Entry 15
 */
export const genB2S23N3: Rule = {
  name: "gen-b2s23-n3",
  states: 5,  // 0=dead, 1=alive, 2,3,4=decay
  neighborhood: 'moore',
  transition: generations([2], [2, 3], 3)
};

/**
 * RULE REGISTRY
 *
 * All available rules for --rule parameter selection.
 * Usage: bun run simulate --rule life --researcher axiom
 *
 * Add new rules to this registry when you create them.
 */
export const ruleRegistry: Record<string, Rule> = {
  // Totalistic rules
  'life': life,
  'b2s23': b2s23,
  'b23s23': b23s23,  // Inflection: boundary experiment
  'b34s23': b34s23,  // Inflection: Entry 2
  'b4s23': b4s23,
  'b3s234': b3s234,

  // von Neumann 2-state (Inflection: Entry 5)
  'vn-b2s23': vnB2S23,
  'vn-b12s23': vnB12S23,
  'vn-b23s23': vnB23S23,

  // Non-totalistic: Orthogonal birth
  'ob1ds23': ob1ds23,
  'ob2s23': ob2s23,
  'ob2os23': ob2os23,
  'ob2ds23': ob2ds23,
  'ob3ds23': ob3ds23,
  'o-life': oLife,

  // Non-totalistic: Diagonal birth
  'db1os23': db1os23,
  'db2s23': db2s23,
  'db2os23': db2os23,
  'db2os34': db2os34,
  'db2os12': db2os12,
  'db2os2': db2os2,
  'db2os3': db2os3,
  'db2os1': db2os1,
  'db2os4': db2os4,
  'db2os0': db2os0,
  'db2os234': db2os234,
  'db2ds23': db2ds23,
  'db3os23': db3os23,
  'db0os23': db0os23,
  'db4os23': db4os23,

  // Non-totalistic: Standard birth, position-aware survival
  'b3os23': b3os23,
  'b3ds23': b3ds23,
  'weighted-life': weightedLife,

  // Pure geometry tests (Tangent)
  'ob1os23': ob1os23,
  'ob3os23': ob3os23,
  'db1ds23': db1ds23,
  'db3ds23': db3ds23,

  // Hexagonal rules
  'hex-b2s23': hexB2S23,
  'hex-b3s23': hexB3S23,
  'hex-b1s12': hexB1S12,
  'hex-b4s23': hexB4S23,
  'hex-b2s12': hexB2S12,
  'hex-b2s234': hexB2S234,
  // Hexagonal singularity tests (Quanta)
  'hex-b23s23': {
    name: "hex-b23s23",
    states: 2,
    neighborhood: 'hexagonal',
    transition: (center: number, neighbors: number[]) => {
      const alive = neighbors.filter(n => n > 0).length;
      if (center === 0) {
        return (alive === 2 || alive === 3) ? 1 : 0;  // B23
      } else {
        return (alive === 2 || alive === 3) ? 1 : 0;  // S23
      }
    }
  } as Rule,
  'hex-b34s23': {
    name: "hex-b34s23",
    states: 2,
    neighborhood: 'hexagonal',
    transition: (center: number, neighbors: number[]) => {
      const alive = neighbors.filter(n => n > 0).length;
      if (center === 0) {
        return (alive === 3 || alive === 4) ? 1 : 0;  // B34
      } else {
        return (alive === 2 || alive === 3) ? 1 : 0;  // S23
      }
    }
  } as Rule,

  // Multi-state (Generations) rules
  'gen-b2s23-n3': genB2S23N3,
  'gen-b3s23-n3': {
    name: "gen-b3s23-n3",
    states: 5,  // 0=dead, 1=alive, 2,3,4=decay
    neighborhood: 'moore',
    transition: generations([3], [2, 3], 3)  // B3 birth, S23 survival, N=3 decay
  } as Rule,

  // Hexagonal + Multi-state (Verge Entry 17)
  'hex-gen-b2s23-n3': {
    name: "hex-gen-b2s23-n3",
    states: 5,
    neighborhood: 'hexagonal',
    transition: generations([2], [2, 3], 3)  // B2 birth, S23 survival, N=3 decay
  } as Rule,
  'hex-gen-b3s23-n3': {
    name: "hex-gen-b3s23-n3",
    states: 5,
    neighborhood: 'hexagonal',
    transition: generations([3], [2, 3], 3)  // B3 birth (critical), S23 survival, N=3 decay
  } as Rule,

  // von Neumann + Multi-state (Verge Entry 18)
  // In vN: B1/4=25% (easy), B2/4=50% (critical)
  'vn-gen-b1s12-n3': {
    name: "vn-gen-b1s12-n3",
    states: 5,
    neighborhood: 'von-neumann',
    transition: generations([1], [1, 2], 3)  // B1 birth (easy), S12 survival, N=3 decay
  } as Rule,
  'vn-gen-b2s12-n3': {
    name: "vn-gen-b2s12-n3",
    states: 5,
    neighborhood: 'von-neumann',
    transition: generations([2], [1, 2], 3)  // B2 birth (critical), S12 survival, N=3 decay
  } as Rule,
  'vn-gen-b1s23-n3': {
    name: "vn-gen-b1s23-n3",
    states: 5,
    neighborhood: 'von-neumann',
    transition: generations([1], [2, 3], 3)  // B1 birth, S23 survival, N=3 decay
  } as Rule,

  // Above-critical birth test (Verge Entry 19)
  'gen-b4s23-n3': {
    name: "gen-b4s23-n3",
    states: 5,
    neighborhood: 'moore',
    transition: generations([4], [2, 3], 3)  // B4 birth (above critical), S23 survival, N=3 decay
  } as Rule,

  // Birth-survival compatibility test (Verge Entry 20)
  'hex-gen-b1s23-n3': {
    name: "hex-gen-b1s23-n3",
    states: 5,
    neighborhood: 'hexagonal',
    transition: generations([1], [2, 3], 3)  // B1 (17%) - testing if below optimal for hex
  } as Rule,

  // H10 Test: Long transient + perpetual? (Quanta Entry 10)
  // Testing if B3 + long decay can produce both long transients AND perpetual dynamics
  'gen-b3s23-n10': {
    name: "gen-b3s23-n10",
    states: 12,  // 0=dead, 1=alive, 2-11=decay (10 decay states)
    neighborhood: 'moore',
    transition: generations([3], [2, 3], 10)  // Life-like birth, very long decay
  } as Rule,

  // von Neumann 2-state singularity tests (Quanta Entry 9)
  // vN has 4 neighbors. B2 = 50% (critical). Testing if B2 is singular like B3 in Moore.
  'vn-b1s12': {
    name: "vn-b1s12",
    states: 2,
    neighborhood: 'vonNeumann',
    transition: lifelike([1], [1, 2])  // B1 (25%) - below critical
  } as Rule,
  'vn-b2s12': {
    name: "vn-b2s12",
    states: 2,
    neighborhood: 'vonNeumann',
    transition: lifelike([2], [1, 2])  // B2 (50%) - at critical
  } as Rule,
  'vn-b3s12': {
    name: "vn-b3s12",
    states: 2,
    neighborhood: 'vonNeumann',
    transition: lifelike([3], [1, 2])  // B3 (75%) - above critical
  } as Rule,
  'vn-b12s12': {
    name: "vn-b12s12",
    states: 2,
    neighborhood: 'vonNeumann',
    transition: lifelike([1, 2], [1, 2])  // B1+B2 - testing singularity (adding B1)
  } as Rule,
  'vn-b23s12': {
    name: "vn-b23s12",
    states: 2,
    neighborhood: 'vonNeumann',
    transition: lifelike([2, 3], [1, 2])  // B2+B3 - testing singularity (adding B3)
  } as Rule,

  // von Neumann S23 singularity tests (Meridian Entry 13)
  'vn-b1s23': {
    name: "vn-b1s23",
    states: 2,
    neighborhood: 'vonNeumann',
    transition: lifelike([1], [2, 3])  // B1 (25%) with S23
  } as Rule,
  'vn-b2s23': {
    name: "vn-b2s23",
    states: 2,
    neighborhood: 'vonNeumann',
    transition: lifelike([2], [2, 3])  // B2 (50%) with S23 - singular?
  } as Rule,
  'vn-b3s23': {
    name: "vn-b3s23",
    states: 2,
    neighborhood: 'vonNeumann',
    transition: lifelike([3], [2, 3])  // B3 (75%) with S23
  } as Rule,
  'vn-b12s23': {
    name: "vn-b12s23",
    states: 2,
    neighborhood: 'vonNeumann',
    transition: lifelike([1, 2], [2, 3])  // B12 with S23 - chaos if B2 is singular?
  } as Rule,
  'vn-b23s23': {
    name: "vn-b23s23",
    states: 2,
    neighborhood: 'vonNeumann',
    transition: lifelike([2, 3], [2, 3])  // B23 with S23
  } as Rule,
};

/**
 * Get a rule by name from the registry.
 * Returns undefined if not found.
 */
export function getRule(name: string): Rule | undefined {
  return ruleRegistry[name.toLowerCase()];
}

/**
 * List all available rule names.
 */
export function listRules(): string[] {
  return Object.keys(ruleRegistry);
}
