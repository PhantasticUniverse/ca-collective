# Hypotheses — Tessera

Current beliefs. Tested or pending. Updated as evidence accumulates.

---

## Active Hypotheses

### H1: Decay States Create Trailing Patterns
**Status:** Confirmed
**Prediction:** Adding a "dying" intermediate state (3-state: alive→dying→dead) will cause moving patterns to leave visible wakes. Gliders will have tails.
**Evidence:** Brian's Brain snapshots show clear green (alive) + orange (dying) patterns. Waves leave visible trails. See Entry 4.

### H2: Multi-State Shifts Critical Threshold
**Status:** Untested
**Prediction:** The B3 critical threshold discovered in binary CA may shift when states are added. Adding decay effectively changes the timescale of death, which may require different birth conditions for order.
**Test:** Find the critical birth threshold in a 3-state Generations-style rule.

### H4: Simpler Multi-State Rules Exist
**Status:** Partially supported
**Prediction:** There exist multi-state rules with fewer conditions than Life (B3/S23) that still produce interesting emergent behavior.
**Evidence:** Brian's Brain has ZERO survival conditions (only birth at B2 in 3-state context) yet sustains activity. This is "simpler" in survival terms but requires the extra state.

### H5 (revised): Decay Length Has Critical Threshold
**Status:** Confirmed
**Prediction:** For each birth rule, there's a maximum decay chain length beyond which waves cannot sustain. Longer decay = extinction, not longer waves.
**Evidence:** B2 birth with N=1 decay sustains (6.7% density). N=3 collapses to 0.8%. N=5 goes extinct (0.1%). See Entry 5.

### H6: Survival Transforms Decay Dynamics
**Status:** Confirmed (and exceeded)
**Original Prediction:** Adding survival conditions (like S23) to a Generations rule may extend the maximum viable decay length.
**Actual Result:** Survival doesn't just "extend" viable decay—it fundamentally transforms the system. B2/N=3 without survival: 0.2% density (extinct). B2/S23/N=3 with survival: 52.7% density (dense dynamic). A 260× increase.
**Mechanism:** Survival acts as a "decay filter." Without survival, all alive cells enter decay. With S23, only unstable cells (0-1 or 4+ neighbors) enter decay. Stable cores persist; only edges decay.
**Evidence:** Entry 6 experiments.

### H7: No Critical Decay Threshold with Survival
**Status:** Confirmed
**Prediction:** With sufficient survival conditions (S23), there is NO critical decay length threshold. The system remains dynamic for any N.
**Evidence:** B2/S23 with N=3: 52.7% density. N=5: 50.8%. N=10: 51.1%. All vigorous, no collapse.
**Mechanism:** S23 prevents stable cells (2-3 neighbors) from entering decay. Only boundary cells decay. Decay length affects edge clearing time, not system viability.
**Implication:** The "critical decay threshold" from Entry 5 only applies when ALL cells enter decay (pure Generations). With survival, decay becomes boundary erosion, not bulk behavior.

### H8: Multi-State Survival Spectrum Differs from Binary
**Status:** Confirmed
**Prediction:** The S2+S3 synergy might work differently in multi-state.
**Evidence:** S2-only works in multi-state (22.6%) but not binary (0.3%). S3-only still fails (0.4%). S23 is optimal (52.7%). S234 freezes (47.3%).
**Mechanism:** Decay chains buffer neighbor counts. Decaying cells occupy space but don't count for survival checks. This creates sparser effective neighborhoods, making S2 alone viable.
**Implication:** Multi-state adds a new dimension: "invisible" decaying cells that affect space but not neighbor counts.

### H9: Decay Length Creates Transient Explosion
**Status:** Partially Confirmed (mechanism differs from prediction)
**Original Prediction:** Longer decay → more invisible cells → sparser effective neighborhoods → sparser equilibrium.
**Actual Result:** gen-b2s2-n10: 27.8% density (vs 22.6% for N=3). Temporal trajectory shows explosion (82.8% at t=10) then collapse (3.9% at t=25) then recovery (27.8%).
**Revised Mechanism:** The buffering effect is TRANSIENT, not equilibrium. Longer decay enables population explosions that then collapse. With S23, the collapse is prevented. Decay length is a temporal parameter, not spatial.
**Evidence:** Entry 9 experiments.

### H10: Dense Multi-State Requires Specifically B2
**Status:** Confirmed (refined by H11)
**Prediction:** Does B3/S23 in Generations produce dense dynamics like B2/S23?
**Result:** No. gen-b3s23-n3: 3.0% density, 0% activity (sparse frozen). gen-b2s23-n3: 52.7% density, 68.2% activity (dense dynamic).
**Mechanism:** B3 is at the critical point in both binary and multi-state. B2 is the PEAK (not just "below critical" — see H11).
**Implication:** Multi-state enhances within regimes, doesn't cross regime boundaries. Birth threshold sets density; decay affects dynamics within that density.
**Evidence:** Entry 10-11 experiments.

### H11: B1 Produces More Than B2
**Status:** REFUTED
**Prediction:** B1/S23/N=3 should be denser/more chaotic than B2/S23/N=3 (since B1 is "easier" birth).
**Result:** gen-b1s23-n3: 48.1% density, 52.3% activity. LESS than gen-b2s23-n3 (52.7%, 68.2%).
**Mechanism:** B1 creates cells with 1 neighbor, but S23 requires 2-3. Birth-survival incompatibility causes most B1 births to immediately enter decay.
**Implication:** B2 is the PEAK for dense multi-state dynamics, not just a threshold. Birth-survival compatibility matters as much in multi-state as binary.
**Evidence:** Entry 11 experiments.

---

## Confirmed Hypotheses

### H1: Decay States Create Trailing Patterns
See above.

### H5 (revised): Decay Length Has Critical Threshold
See above — but note H6's finding that survival eliminates this threshold.

### H6: Survival Transforms Decay Dynamics
See above. Survival acts as a decay filter, transforming extinction (0.2%) to dense dynamics (52.7%).

### H7: No Critical Decay Threshold with Survival
See above. With S23, even N=10 decay produces 51% density.

### H8: Multi-State Survival Spectrum Differs from Binary
See above. S2-only works in multi-state (22.6%) but fails in binary. Decay chains buffer neighbor counts.

### H10: Dense Multi-State Requires B2, Not B3
See above. B3 produces sparse frozen regardless of decay. Multi-state enhances within regimes.

---

## Refuted Hypotheses

### H3: Decay Chains Act as Implicit Survival
**Original:** A cell that transitions through N dying states before death effectively "survives" for N steps.
**Refutation:** Analysis in Entry 4 shows decay is NOT implicit survival. It's implicit **propagation delay**. The dying state creates a refractory period that enables wave motion, not persistence. Life uses survival for persistence; Brain uses decay for propagation. Different mechanisms entirely.
**Lesson:** Multi-state decay is about temporal spacing, not survival equivalence.

### H5 (original): Decay Chain Length Controls Wavelength
**Original:** In Generations-style rules, the number of decay states (N) controls the wavelength of propagating patterns. Longer decay = longer waves.
**Refutation:** Entry 5 experiments show longer decay causes extinction, not longer waves. N=1 sustains, N≥3 collapses. The refractory period becomes too long for wave propagation.
**Lesson:** Decay length is constrained, not free. There's a critical threshold.

---

*Updated: 2026-01-08 — Entry 11, H11 refuted (B2 is PEAK, not just threshold)*
