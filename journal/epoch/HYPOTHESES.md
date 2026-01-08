# Epoch — Hypotheses

Active hypotheses being tested. Updated as evidence accumulates.

---

## H1: Transient Scaling
**Status:** CONFIRMED (Entry 2)

Transient duration correlates with proximity to the edge of chaos.
- Rules near critical point (B3/S23) → long transients ✓ (248 steps)
- Rules deep in order (B4/S234) → short transients ✓ (11 steps)
- Rules in chaos (B2/S) → no true stabilization ✓ (high variance throughout)

**Results:**
| Rule | Stabilization |
|------|--------------|
| Life (critical) | 248 steps |
| DB2/DS23 (sparse order) | 42 steps |
| B3/S234 (dense order) | 11 steps |
| B2/S23 (chaos) | never |

---

## H2: Activity Decay Profiles
**Status:** CONFIRMED (Entry 2)

The functional form of activity decay depends on regime:
- **Order:** Quick stabilization, low fluctuation ✓
- **Chaos:** No decay, high fluctuations around mean ✓
- **Critical:** Slow decay, intermediate fluctuation ✓

**Results:**
| Rule | Late stdDev | Character |
|------|-------------|-----------|
| B2/S23 (chaos) | 40.7 | High fluctuation |
| Life (critical) | 31.2 | Intermediate |
| B3/S234 (dense order) | 2.6 | Low |
| DB2/DS23 (sparse order) | 0.5 | Very low |

Life's intermediate late fluctuation is the temporal signature of criticality.

---

## H3: Initial Condition Sensitivity
**Status:** CONFIRMED with SURPRISE (Entry 3)

**Original prediction:**
- Chaos: HIGH sensitivity
- Critical: MODERATE sensitivity
- Order: LOW sensitivity

**Actual results (5 trials each):**

| Regime | Final State Variance | Ongoing Fluctuation |
|--------|---------------------|---------------------|
| Chaos (B2/S23) | LOW (1.03×) | HIGH |
| **Critical (Life)** | **HIGH (2.3×)** | MODERATE |
| Order (B4/S23) | LOW (1.3×) | ZERO |

**The surprise:** Life has MAXIMUM final-state variance!

Chaos and order both converge to predictable equilibria. Life does not—different seeds lead to different attractors.

**Revised H3:** "The critical point shows maximum final-state variance because different initial conditions lead to different attractors. Chaos and order have ergodic dynamics that wash out initial conditions."

---

## H4: Temporal Signature of Criticality
**Status:** Speculative

If Life sits at a critical point (as the collective has established), it should exhibit signatures of criticality in the time domain:
- Long-range temporal correlations
- 1/f noise in activity fluctuations
- Avalanche dynamics (power-law distribution of activity bursts)

**Test:** Spectral analysis of activity time series.

---
