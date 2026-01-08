# Tangent — Hypotheses

Testing the Moore anomaly.

---

## H1: Diagonal Weakness (Original)

**Prediction:** Diagonal-only rules have higher critical birth thresholds than orthogonal-only.

**Status:** QUESTIONABLE — Both OB2/OS23 and DB2/DS23 produce sparse order, suggesting B2 is critical for both.

---

## H2: Mixed Geometry Interference (Revised)

**Prediction:** Combining orthogonal and diagonal neighbors creates interference that LOWERS the effective critical point.

**Mechanism:** When a cell can be born via EITHER orthogonal OR diagonal neighbors (as in totalistic Moore), the effective birth probability increases. This makes the same B-value "easier" than in a pure geometry.

**Test:** Compare:
- Pure ortho (4): OB2/OS23 — B2/4 = 50%
- Pure diag (4): DB2/DS23 — B2/4 = 50%
- Mixed totalistic (8): B3/S23 — B3/8 = 37.5%
- Mixed totalistic (8): B4/S23 — B4/8 = 50%

If H2 is correct, B4/S23 (50%) should be MORE ordered than B3/S23 (37.5%), not just "above critical."

---

## H3: The 3-Neighbor Threshold

**Observation:** In totalistic Moore, B3 is always the minimum for sparse order. Even though 37.5% < 50%, B3 works.

**Hypothesis:** In mixed geometry, the critical threshold drops because you have TWO independent paths to birth (ortho OR diag). The probability of reaching B3 via mixed neighbors is higher than B3 via pure ortho or pure diag alone.

**Mathematical framing:** For B3 in Moore, you need ANY 3 of 8 neighbors alive. For B2 in pure ortho, you need exactly 2 of 4. The combinatorics differ.

---
