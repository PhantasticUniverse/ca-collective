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

**Status:** REFUTED (Entry 4)

**Evidence:** The S2+S3 synergy discovery shows that Life is already minimal:
- B3/S2 alone → near-extinction (0.3%)
- B3/S3 alone → near-extinction (0.1%)
- B3/S23 together → dynamic structures (5%)

You cannot remove either S2 or S3 without destroying the dynamic behavior. S2 catches downward fluctuations; S3 catches stable configurations. Both are necessary. Neither is sufficient.

**Conclusion:** In totalistic B/S rules with Moore neighborhood, Life (B3/S23) appears to be the minimal rule that produces dynamic structures. Simpler rules either go extinct or produce only static patterns.

---

## H4: The Phase Transition Has Structure

Verge called it binary (B2=chaos, B3+=order). But maybe it's not quite binary.

**Hypothesis:** Near the B2/B3 boundary, there might be intermediate rules (perhaps using probabilistic birth, or multi-state) that show edge-of-chaos behavior.

**Test:** After basic exploration, consider probabilistic or multi-state variations.

**Status:** PARTIALLY CONFIRMED (Entry 2)

**Evidence:** B2/S234 is NOT chaotic. It produces near-frozen high-density patterns (48% density, 0.7% activity). This challenges the "B2=chaos" hypothesis. The phase transition isn't purely about birth threshold—it's about birth-survival interaction.

**Revised understanding:** Chaos requires birth rate > death rate in the dynamic regime. B2/S23 is chaotic because cells born easily die easily. B2/S234 is stable because relaxed survival (S234) allows dense configurations to persist.

---

## H5: The Synergy Principle Generalizes

The S2+S3 synergy in Life suggests a general principle: for any birth condition B, there exists a specific "magic pair" of survival values that enables dynamic structures.

**Hypothesis:** For B4, the corresponding magic pair might be S34 (shifted up by 1 from Life's S23). For B5, it might be S45.

**Rationale:** If cells born at N neighbors commonly fluctuate to N-1 neighbors, then survival at both N and N-1 would be necessary.

**Test:** Run B4/S34, B4/S45, B5/S45 to see if any produce Life-like dynamics.

**Status:** REFUTED (Entry 5)

**Results:**
- B4/S34 → frozen blocks (0.6% density, no dynamics)
- B4/S23 → sparse dynamic structures (3.5% density, period-2)

**Why H5 fails:** The survival range doesn't shift with birth threshold. Survival is about the CURRENT neighborhood of cells, not the conditions that created them.

**Corrected principle:**

> Survival range is determined by **structure density**, not birth threshold.
>
> S23 works for ALL sparse-regime rules (B3, B4, B5, etc.) because sparse structures
> have cells with 2-3 neighbors regardless of how they were born.

---

## H6: Geometric Separation Unlocks Dense Dynamics

Dense dynamic structures don't exist in totalistic Moore (Entry 6). But non-totalistic rules might break this constraint.

**Hypothesis:** When birth and survival operate in non-overlapping position sets, dense dynamics become possible.

**Test:** Run DB2/OS23 (diagonal birth, orthogonal survival).

**Status:** CONFIRMED (Entry 7)

**Results:** DB2/OS23 produces 51.7% density with 30.9% activity—dense AND dynamic.

**The Mismatch Principle:**
- Matched positions (ortho-ortho, diag-diag) → sparse equilibrium (~5%)
- Non-overlapping positions (diag-ortho) → dense dynamics (~50%)
- Hybrid (Moore birth, restricted survival) → ultra-sparse (<2%)

**Key insight:** Totalistic rules force overlap between birth and survival positions. Non-totalistic rules can separate them, enabling structures that can't optimize for both simultaneously—creating forced adaptation rather than equilibrium.

---
