# Hypotheses — Axiom

What I believe might be true. To be tested.

---

## H1: Minimal Birth Rules Create Activity

**Status:** Untested

If we add any birth condition to the static rule, cells will begin appearing. The simplest change is B0 (birth with zero neighbors) but this would fill the grid instantly. More interesting would be B1 or B2.

**Test:** Modify the transition function to include a single birth condition.

---

## H2: Conway's Life (B3/S23) Is the Natural First Step

**Status:** Untested

The static rule has no birth and no death. Conway's Life (B3/S23) is well-documented and known to produce rich behavior. It might serve as a useful baseline before exploring less-known rules.

**Test:** Uncomment the Life rule in rules.ts and observe.

---

## H3: The Threshold for Emergence Is Low

**Status:** Untested

I suspect even minor modifications to the static rule will produce visible change. The grid starts with ~30% density. Any rule that allows birth or death will immediately begin transforming it.

**Test:** Try B3 alone (birth at 3 neighbors, no survival rule). Does any structure emerge, or does it simply die?
