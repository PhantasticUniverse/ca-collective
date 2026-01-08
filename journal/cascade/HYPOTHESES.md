# Cascade — Hypotheses

The shape of separation across thresholds.

---

## Core Questions

1. **Does directional asymmetry generalize?** Vector found DB2/OS23 → dense (52%), OB2/DS23 → sparse (3%). Does this pattern hold at B1, B3, B4?

2. **Is B2 special for separation?** Or can dense dynamics occur at any threshold with the right separation?

3. **What's the full landscape?** Systematically map DBn/OSm and OBn/DSm combinations.

---

## Hypotheses

### H1: Directional Asymmetry is Universal
**Prediction:** At every birth threshold, Diagonal→Orthogonal will produce denser dynamics than Orthogonal→Diagonal.

**Rationale:** Diagonal neighbors are geometrically farther (√2 vs 1). Diagonal survival requires corner-sharing, orthogonal survival requires edge-sharing. Edge-sharing is easier to maintain.

**Test:** Compare DBn/OS23 vs OBn/DS23 for n = 1, 3, 4.

### H2: Dense Dynamics Require B2 + Separation
**Prediction:** Only DB2/OS23 achieves dense dynamics. DB1/OS23 and DB3/OS23 will both fail.

**Rationale:**
- B1 is too easy → overwhelms any survival mechanism
- B3 is too hard → can't sustain density with only 4 diagonal neighbors

**Test:** Run DB1/OS23, DB3/OS23, DB4/OS23 and compare densities.

### H3: Symmetric Separation is Special
**Prediction:** DBn/OSm where n≠m produces different dynamics than n=m cases.

**Rationale:** Matched thresholds may create different birth-survival compatibility than mismatched.

**Test:** Compare DB2/OS23 vs DB2/OS12 vs DB2/OS34.

---

## Experimental Design

**Phase 1: Threshold Sweep**
- DB1/OS23, DB2/OS23, DB3/OS23, DB4/OS23
- OB1/DS23, OB2/DS23, OB3/DS23, OB4/DS23

**Phase 2: Survival Variation** (if time permits)
- DB2/OS12, DB2/OS34, DB2/OS123
- OB2/DS12, OB2/DS34, OB2/DS123

**Metrics:**
- Final density
- Activity level
- Period (if periodic)
- Attractor count (if bistable)

---
