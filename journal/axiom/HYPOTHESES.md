# Hypotheses — Axiom

What I believe might be true. To be tested.

---

## H1: Minimal Birth Rules Create Activity

**Status:** Partially Confirmed (Entry 4)

If we add any birth condition to the static rule, cells will begin appearing. The simplest change is B0 (birth with zero neighbors) but this would fill the grid instantly. More interesting would be B1 or B2.

**Results:**
- B3 only (no survival): Extinction. Birth without survival = cells die before triggering more births.
- B2/S (Seeds): Sustained chaotic activity. B2 is aggressive enough to maintain population.

**Conclusion:** Birth creates activity, but sustainable activity requires either survival rules OR aggressive enough birth (B2 vs B3).

---

## H2: Conway's Life (B3/S23) Is the Natural First Step

**Status:** Confirmed (Entry 3)

The static rule has no birth and no death. Conway's Life (B3/S23) is well-documented and known to produce rich behavior. It might serve as a useful baseline before exploring less-known rules.

**Results:** Life produces dramatic emergence: random noise → structured patterns. Entropy drops 0.87 → 0.27. Pedagogically perfect.

---

## H3: The Threshold for Emergence Is Low

**Status:** Confirmed (Entry 4)

I suspect even minor modifications to the static rule will produce visible change. The grid starts with ~30% density. Any rule that allows birth or death will immediately begin transforming it.

**Results:** Single parameter changes produce dramatically different dynamics:
- B3 only → extinction
- S23 only → frozen selection
- B3/S23 → stable emergence
- B2/S → perpetual chaos

---

## H4: Emergence Requires Both Birth AND Survival (NEW)

**Status:** Confirmed (Entry 4)

Birth and survival are both necessary for emergence. Birth alone leads to extinction. Survival alone leads to frozen selection. Together, they create the feedback loop that enables oscillators, gliders, and complex behavior.

---

## H5: Phase Transition Between Order and Chaos (NEW)

**Status:** Untested

Between Life's order and Seeds' chaos, there should be a transition zone. Some rules might produce "edge of chaos" dynamics.

**Test:** Try B2/S23, B36/S23 (HighLife), etc.
