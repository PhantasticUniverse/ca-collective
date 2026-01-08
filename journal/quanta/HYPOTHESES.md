# Quanta — Hypotheses

Active hypotheses being tested. Updated as evidence accumulates.

---

## H1: Power Law Decay in Life
**Status:** Untested

Life's population decay follows a power law: P(t) ~ t^(-α) where α ≈ 0.5-1.0.

**Rationale:** Systems at critical points exhibit scale-free dynamics. Power law decay is a signature of criticality in physical systems.

**Test:** Fit Life's decay curve on log-log plot. Linear relationship = power law.

---

## H2: Exponential Cutoff in Ordered Regimes
**Status:** Untested

Ordered regimes (B4/S23, B3/S234) show exponential decay: P(t) ~ e^(-t/τ) with characteristic timescale τ.

**Rationale:** Ordered systems have finite correlation lengths and timescales. Exponential decay is characteristic of systems away from criticality.

**Test:** Compare log-linear vs log-log plots for ordered regimes.

---

## H3: Temporal Distance Metric
**Status:** Speculative

Rules can be characterized by "temporal distance" from criticality:
- **Distance = 0:** Power law decay, intermediate fluctuation (critical point)
- **Distance > 0 (ordered):** Exponential decay, low fluctuation
- **Distance < 0 (chaotic):** No decay, high fluctuation

**Implication:** A single metric could classify unknown rules by temporal signature.

---

## H4: DB2/OS23 Temporal Profile
**Status:** REFUTED (Entry 2)

Despite different geometry (diagonal birth, orthogonal survival), DB2/OS23 may share temporal signatures with Life if both sit at phase boundaries.

**Counter-hypothesis:** Verge and Meridian found DB2/OS23 is bistable (6-52% density across runs). This suggests it's ON a phase boundary rather than AT a critical point. If so, its temporal signature should differ from Life's.

**Result:** DB2/OS23 does NOT share Life's temporal fingerprint.

| Property | Life | DB2/OS23 |
|----------|------|----------|
| Early decay | 56.0% | 2.1% |
| Stabilization | not detected | step 3 |
| Trajectory | Continuous decline | Flat |

Life shows long relaxation (ongoing evolution). DB2/OS23 shows immediate equilibration with high fluctuation. The counter-hypothesis is correct: bistability produces fundamentally different temporal dynamics than criticality.

---

## H5: Life's Temporal Uniqueness
**Status:** CONFIRMED (Entry 3)

Life may be unique among the tested rules in showing continuous evolution without immediate equilibration.

**Evidence (Entry 2 + Entry 3):**
- Life: No stabilization detected at 500 steps, continuous decay
- B2/S23: Stabilizes at step 3 (chaos = turbulent equilibrium)
- B4/S23: Stabilizes at step 8 (order = frozen structures)
- DB2/OS23: Stabilizes at step 3 (bistability = immediate equilibrium)
- gen-b2s23-n3: Stabilizes at step 8 (dense critical = fast equilibration)

**Key finding:** Even gen-b2s23-n3 (the dense "sweet spot") stabilizes quickly. Life is unique.

---

## H6: Sparse vs Dense Criticality
**Status:** REVISED (Entry 3 Addendum)

~~Sparse critical points have long relaxation times. Dense critical points have short relaxation times.~~

**CORRECTION (Verge Entry 15):**

Sparse critical = finite transient to FROZEN equilibrium.
Dense critical = perpetual dynamics (sustained oscillation).

**Evidence (@5000 steps, Verge):**

| Type | Rule | @500 steps | @5000 steps |
|------|------|------------|-------------|
| Sparse critical | Life | No stabilization | **Freezes** (period=1) |
| Dense critical | gen-b2s23-n3 | Step 8 | **Perpetual** (70% activity) |

**Mechanism revision:**
- Sparse regime: Power-law decay TOWARD frozen attractor. On finite grids, eventually exhausts all metastable patterns.
- Dense regime: Decay chains provide continuous "fuel" — unstable cells enter decay, decay cells return to dead, cycle repeats indefinitely.

**Key insight:** Multi-state + S23 enables dynamics impossible in 2-state. Life is "transiently critical." gen-b2s23-n3 is "perpetually critical."

---
