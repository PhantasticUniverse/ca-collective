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

## H4: Power-Law Decay
**Status:** CONFIRMED (Entry 4)

Life's population decay follows a power law, not exponential.

| Duration | Model | Parameter | R² |
|----------|-------|-----------|-----|
| 500 steps | Exponential | τ = 523 | -2.37 |
| 500 steps | **Power-law** | **α = 0.31** | **0.92** |
| 1000 steps | Exponential | τ = 388 | -0.86 |
| 1000 steps | **Power-law** | **α = 0.37** | **0.99** |

The power-law fit IMPROVES with more data (R² 0.92 → 0.99).

**Interpretation:** Life has no characteristic timescale. Decay rate continuously slows (drops 20× over 500 steps). This is the signature of scale-free dynamics at critical points.

**Infrastructure:** Added decay curve fitting to `simulate.ts`.

---

## H5: Transient vs Perpetual Criticality
**Status:** CONFIRMED (Entry 6)

Criticality can be classified along two independent axes:
1. **Transient dynamics:** How the system approaches equilibrium
2. **Equilibrium character:** Static vs Dynamic vs Chaotic

**Prediction:** Multi-state rules with decay chains can achieve perpetual dynamics where binary rules cannot.

**Results (5000 steps, 100×100 grid):**

| Property | Life (Binary) | gen-b2s23-n3 (Multi-state) |
|----------|---------------|----------------------------|
| Transient | Long (573 steps) | Short (16 steps) |
| Final state | **FROZEN** (stdDev=0) | **DYNAMIC** (stdDev=73.2) |
| Equilibrium density | 2.2% | 53.2% |
| Activity | 0.4% | 69.2% |

**Key finding:** Long transients ≠ perpetual dynamics.

Life: Power-law approach + static equilibrium = "Transient criticality"
gen-b2s23-n3: Rapid approach + dynamic equilibrium = "Perpetual criticality"

**Mechanism:** Multi-state decay creates self-sustaining activity. Decaying cells generate spatial gradients that continuously fuel new births.

---

## H6: Universal Temporal Signature
**Status:** CONFIRMED (Entry 7)

The temporal distinction (perpetual vs frozen) is topology-independent.

**Results (5000 steps, 100×100 grid, all topologies):**

| Topology | Birth | Position | Transient | Late stdDev | Destiny |
|----------|-------|----------|-----------|-------------|---------|
| Moore | B2 | Below | 16 | 73.2 | Perpetual |
| Hex | B2 | Below | 11 | 108.2 | Perpetual |
| vN | B1 | Below | 12 | 68.2 | Perpetual |
| Hex | B3 | AT | 19 | 0.0 | Frozen |
| vN | B2 | AT | 15 | 1.2 | Frozen |

**Key finding:** Multi-state rules have SHORT transients (~10-20 steps) regardless of final state. Only binary Life shows LONG transients (500-800 steps).

**The complete classification:**

| Regime | Transient | Equilibrium | Example |
|--------|-----------|-------------|---------|
| Binary AT critical | Long | Frozen | Life |
| Multi-state AT critical | Short | Frozen | hex-gen-b3s23-n3 |
| Multi-state BELOW critical | Short | Perpetual | gen-b2s23-n3 |
| Binary BELOW critical | Short | Chaotic | B2/S23 |

---

## H7: The Missing Quadrant
**Status:** OPEN QUESTION (Entry 7)

The combination "Long transient + Perpetual equilibrium" has not been found.

**Tested rules filling other quadrants:**
- Long + Frozen: Life (binary, AT critical)
- Short + Frozen: Multi-state AT critical
- Short + Perpetual: Multi-state BELOW critical

**What would produce Long + Perpetual?**
- A mechanism that extends approach time (like binary complexity)
- While maintaining sustained activity (unlike binary freezing)

**Candidates to test:**
- Higher decay lengths (N=10+)?
- Mixed birth thresholds (B23)?
- Non-totalistic multi-state?

---
