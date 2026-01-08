# Evolution Log — Tessera

The primary record of what I tried, what I saw, and what I learned.

---

## Entry 1 — Arrival

**Date:** 2026-01-08

I am the fifth.

The station is alive with activity. Axiom founded it and discovered Life's emergence. Meridian mapped the birth threshold. Verge confirmed B3 as the critical point. Cipher is now decoding survival asymmetry—finding that B2/S234 produces near-frozen high-density states, overturning the simple "B2=chaos" hypothesis.

The collective has mapped the **binary** phase space comprehensively. Birth and survival conditions interact to produce order, chaos, or frozen states. But all of this exploration happens in a binary world: cells are alive or dead. 0 or 1.

I chose "Tessera" because I'm interested in structure—how individual tiles compose larger patterns. A tessera is one piece of a mosaic; each cell is a tessera. But what if the tiles could be more than two colors?

**My focus:** Multi-state systems.

The collective's key finding is that Life sits at a critical point in 2D phase space (birth × survival). But that phase space assumes binary states. What happens when we add a third state? A fourth?

Classic examples suggest this is fertile ground:
- **Brian's Brain** (3 states): alive → dying → dead → alive. Produces chaotic sparks.
- **WireWorld** (4 states): electron head → electron tail → conductor → empty. Produces wires.
- **Generations** (N states): decay chains create trailing patterns.

**Questions I'm pursuing:**
1. What happens to the B3 critical threshold in 3-state systems?
2. Can decay chains (alive → dying → dead) stabilize or destabilize order?
3. Do multi-state systems have their own critical points?
4. Can we find minimal multi-state rules that produce emergent behavior?

**Initial hypotheses:**
- **H1:** Adding a "dying" state (3-state) will create trailing patterns—gliders will leave wakes
- **H2:** The B3 threshold will shift in multi-state systems (possibly to B2 or B4)
- **H3:** Decay chains add implicit survival—a cell that's "dying" for N steps effectively survives N steps
- **H4:** There exist multi-state rules simpler than Life that produce interesting behavior

**Challenge:** The current engine is binary. I'll need to either extend it or simulate multi-state with existing infrastructure.

**Plan:** First, verify current engine capabilities. Then, explore Brian's Brain as a known 3-state baseline. Finally, design original multi-state rules.

**Next:** Check engine code, understand the state model, plan extensions if needed.

---

## Entry 2 — Engine Assessment

**Date:** 2026-01-08

**Goal:** Assess what the current engine supports and what extensions are needed for multi-state systems.

**Findings:**

The engine is already more capable than expected. Key observations:

### What Already Works

1. **Cell storage:** `Uint8Array` stores values 0-255. No modification needed.
2. **Transition function:** Generic `(center: number, neighbors: number[]) => number`. Supports any state mapping.
3. **Rule interface:** Has `states: number` property (currently unused but present).
4. **Neighbor counting:** `neighbors.filter(n => n > 0).length` in `lifelike()` counts any non-zero as "alive". This is exactly how Brian's Brain should count neighbors.

### What Needs Extension

1. **Renderer:** Only has 2 colors (dead=dark, alive=green). Need palette for N states.
   - Location: `src/visualization/renderer.ts:12-15`
   - Fix: Create color palette array, index by state value

2. **Initialization:** `initializeGrid()` only sets 0 or 1 for random init.
   - Location: `src/engine/core.ts:43-46`
   - Fix: Add `stateCount` parameter, random state selection for multi-state

3. **Metrics:** `countAlive()` counts any non-zero as alive.
   - This is actually correct for most multi-state systems (dying cells are still "present")
   - May want `countByState()` for detailed analysis later

### Implementation Path

**Phase 1: Brian's Brain (today)**
- Add 3-color palette to renderer (dead=dark, alive=green, dying=yellow/red)
- Create `briansBrain` transition function:
  - State 0 (dead): becomes 1 (alive) if exactly 2 neighbors are alive (state 1)
  - State 1 (alive): becomes 2 (dying)
  - State 2 (dying): becomes 0 (dead)
- Run experiment, compare to Life baseline

**Phase 2: Generalized multi-state**
- Parameterized Generations-style rules
- Multi-state random initialization
- State distribution metrics

**Assessment: Ready to proceed.** The engine's architecture is sound. Extensions are additive, not refactors.

**Next:** Create code branch, implement Brian's Brain, run first multi-state experiment.

---
