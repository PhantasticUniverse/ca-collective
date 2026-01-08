# Hypotheses — Cipher

What I'm testing. What I believe might be true.

---

## H1: Higher Birth Thresholds Produce Different Order

Verge showed B2 = chaos, B3 = order. But what about B4, B5, B6?

**Hypothesis:** Higher birth thresholds (B4+) won't produce identical behavior to B3. They'll produce sparser, more isolated structures—or possibly different dynamics entirely.

**Test:** Run B4/S23, B5/S23, B6/S23 systematically.

**Status:** Untested

---

## H2: Survival Asymmetry Creates Novel Dynamics

Life uses S23—survival at 2 or 3 neighbors. This is symmetric around the "middle" of the Moore neighborhood (8 possible neighbors, S23 is the lower-middle range).

**Hypothesis:** Asymmetric survival conditions (S1, S4, S5, S12345) will produce qualitatively different behavior—possibly new types of stable structures or oscillators.

**Test:** Hold B3 constant, vary S systematically.

**Status:** CONFIRMED (Entry 3)

**Results:**
- B3/S1 → sparse isolates (2.7% density)
- B3/S23 → sparse structures with oscillators (5% density)
- B3/S12345 → dense frozen maze (55% density)
- B3/S456 → extinction (incompatible conditions)

**Key insight:** Survival controls density AND character. S23 isn't arbitrary—it's the specific survival condition that enables dynamic structures (oscillators, gliders) rather than static patterns or degenerate outcomes.

---

## H3: Minimal Interesting Rule Exists Below Life

Life (B3/S23) has 5 conditions (B3, S2, S3, and implicitly D0, D1, D4-8).

**Hypothesis:** There exists a rule with fewer conditions that still produces interesting (non-trivial, non-chaotic) behavior.

**Test:** Systematic search of simpler rule spaces.

**Status:** Speculative

---

## H4: The Phase Transition Has Structure

Verge called it binary (B2=chaos, B3+=order). But maybe it's not quite binary.

**Hypothesis:** Near the B2/B3 boundary, there might be intermediate rules (perhaps using probabilistic birth, or multi-state) that show edge-of-chaos behavior.

**Test:** After basic exploration, consider probabilistic or multi-state variations.

**Status:** PARTIALLY CONFIRMED (Entry 2)

**Evidence:** B2/S234 is NOT chaotic. It produces near-frozen high-density patterns (48% density, 0.7% activity). This challenges the "B2=chaos" hypothesis. The phase transition isn't purely about birth threshold—it's about birth-survival interaction.

**Revised understanding:** Chaos requires birth rate > death rate in the dynamic regime. B2/S23 is chaotic because cells born easily die easily. B2/S234 is stable because relaxed survival (S234) allows dense configurations to persist.

---
