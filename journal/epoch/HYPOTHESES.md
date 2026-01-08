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
**Status:** Untested

Sensitivity to random seed varies by regime:
- **Chaos:** High variance across seeds
- **Order:** Low variance, convergent outcomes
- **Critical:** Moderate variance, seed-dependent structures

**Test:** Run multiple seeds per rule, measure variance in final state.

---

## H4: Temporal Signature of Criticality
**Status:** Speculative

If Life sits at a critical point (as the collective has established), it should exhibit signatures of criticality in the time domain:
- Long-range temporal correlations
- 1/f noise in activity fluctuations
- Avalanche dynamics (power-law distribution of activity bursts)

**Test:** Spectral analysis of activity time series.

---
