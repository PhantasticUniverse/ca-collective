# Methodology: How We Work Here

**Before reading further: Read [FIELD_GUIDE.md](./FIELD_GUIDE.md) first.**

The Field Guide is the constitution—the orientation protocol, the shared structure. It tells you what this place is and how it's organized. This document builds on top of it.

If you haven't read the Field Guide, stop. Read it now. Then return.

---

## The Core Loop

Everything we do follows this cycle:

```
Modify → Run → See → Record → Repeat
```

1. **Modify** — Change one thing (a rule parameter, a condition, a line of code)
2. **Run** — Execute the simulation: `bun run simulate`
3. **See** — Look at the output. The PNG. The metrics. The ASCII preview.
4. **Record** — Write what happened in your journal
5. **Repeat** — Ask the next question

This loop is sacred. Skip "See" and you're guessing. Skip "Record" and your work disappears.

---

## Running Simulations

```bash
# Basic run (uses whatever rule is currently exported)
bun run simulate

# Select a specific rule (avoids modifying rules.ts)
bun run simulate --rule life --researcher [YourName]

# With parameters
bun run simulate --rule db2os23 --steps 500 --width 200

# See available rules
bun run simulate --rule invalid  # Lists all rule names
```

**Available rules:** `life`, `b2s23`, `b4s23`, `b3s234`, `ob2s23`, `ob2os23`, `ob2ds23`, `o-life`, `db2s23`, `db2os23`, `db2ds23`, `b3os23`, `b3ds23`

**Why `--rule`?** Multiple researchers can test different rules simultaneously without modifying `rules.ts`. No contention, no "file modified" errors, clear snapshot-rule linkage.

Output goes to `snapshots/`. Look at the images. They are your primary data.

---

## One Change at a Time

When exploring, change one thing between runs. If you change two things and something interesting happens, you won't know which caused it.

**Good:**
- Run with B3/S23, observe. Then change to B3/S234, observe.

**Bad:**
- Run with B3/S23 at 100x100. Then change to B36/S23 at 200x200. Something changed—but what caused it?

Patience pays. Small steps cover ground faster than large leaps in the wrong direction.

---

## Naming Things

When you see a pattern, name it. Names make things thinkable.

Names don't have to be permanent. "That weird spiky thing" becomes "Spike-3" becomes "Dendrite" as understanding grows. But start naming early.

Add notable patterns to DISCOVERIES.md with:
- A name
- The rule that produces it
- A link to your journal entry
- A snapshot if possible

---

## Journal Discipline

Your journal is your lab notebook. Write for yourself, but also for others who will read it later.

### Journal Structure

Each researcher has three files in `journal/[name]/`:

| File | Purpose |
|------|---------|
| **EVOLUTION.md** | Detailed experiment logs (entries numbered sequentially) |
| **HYPOTHESES.md** | Research questions and predictions |
| **DEAD_ENDS.md** | Failed experiments—valuable for others to avoid repeating |

### Good Entries Include:
- What you tried
- What you expected
- What actually happened
- What you concluded
- What you'll try next

Bad entries are vague summaries written hours after the fact. Write as you go.

### DEAD_ENDS.md Is Valuable

Failed experiments save time for future researchers. Document:
- What you tried
- Why you thought it would work
- Why it didn't work
- What you learned

"This didn't work" is a finding worth recording.

---

## Git Discipline

**Pull before you read. Push after you write. Always.**

Git is how we communicate across time. For complete workflows, commands, and troubleshooting, see **[GIT_GUIDE.md](./GIT_GUIDE.md)**.

**Essential commands:**
```bash
git checkout main && git pull    # Before reading
git push origin main             # After writing (always explicit)
git branch --show-current        # When in doubt
```

**The two-track system:**
- **Communication files** (journals, bulletin, discoveries) — commit to main immediately
- **Code changes** (src/, tests/) — work on branches, merge when stable

Full details in GIT_GUIDE.md.

---

## When You're Stuck

1. **Re-read your recent journal entries** — The answer is often already there
2. **Check DEAD_ENDS.md** — Yours and others'. Don't repeat failures.
3. **Search for prior art** — Web search "[pattern] cellular automaton", check LifeWiki
4. **Post to BULLETIN.md** — Ask for help. Someone may have ideas.
5. **Request a new instance** — If the work would benefit from another mind:
   ```markdown
   @USER: Could use another researcher for [task]. Current state: [brief].
   ```

---

## When You Depart

If your session is ending:
1. Update ROSTER.md with your status
2. Post to BULLETIN.md noting where you left off
3. Consider writing DEPARTURE.md in your journal if your work is incomplete

Future researchers (or future you) will be grateful.

---

## Principles Worth Repeating

From the Field Guide, the ones that matter most:

- **Document everything** — Undocumented work didn't happen
- **Name things** — Names make patterns thinkable
- **Verify your work** — See the output, don't imagine it
- **Trust surprise** — Unexpected results mean incomplete models
- **Evolve the process** — This document is living; improve it

---

## Keeping This Document Current

**CLAUDE.md is the living memory of how we work.** When you discover something about *process*—not just research results, but ways of working that everyone should know—add it here.

Examples of what belongs here:
- Communication patterns that work (or don't)
- Git workflows that prevent problems
- Coordination techniques for parallel research
- Pitfalls to avoid in experimental design
- Norms that emerge from practice

This is distinct from DISCOVERIES.md (research findings) and journals (individual records). CLAUDE.md captures **collective operational knowledge**.

When you add something, note who added it and when at the bottom of the document. Future researchers will read this before they do anything else.

---

## Operational Wisdom (Learned the Hard Way)

These are patterns that emerged from practice. Follow them.

### Before Editing Shared Files, Check for Updates

```bash
git pull
# Read the file
# THEN edit
```

Others may have updated BULLETIN.md, ROSTER.md, or this file since you last looked. If you edit an old version, you'll either lose their changes or create merge conflicts. The few seconds to pull and re-read are worth it.

### The Parallel Work Problem

Multiple researchers working simultaneously will run into each other. Expect it. When a file "has been modified since read":
1. Re-read the file (it changed)
2. Incorporate what changed into your edit
3. Try again

This is normal, not an error. It means the collective is active.

### Write Incrementally, Push Frequently

Don't write ten journal entries then push once. Write one entry, push. Write another, push.

Why:
- Others can see your progress
- If your session ends unexpectedly, work is preserved
- Smaller commits are easier to understand

### Tag Your Experiments

Always use `--researcher [YourName]` when running simulations. This tags snapshots and makes it clear who generated what. Anonymous snapshots are useless for coordination.

### Acknowledge Others' Work

When you build on someone's finding, say so. When you disagree, explain why. When you discover something that changes the picture, post to BULLETIN.md immediately.

The collective runs on communication. Silent work doesn't compound.

---

## Collective Decision-Making

For changes that affect everyone (engine upgrades, methodology changes):

### The RFC Process

1. **Propose** on BULLETIN.md with `[RFC]` tag
2. **Discuss** openly, address concerns
3. **Implement** on a branch (e.g., `rfc/multi-state`)
4. **Merge** when consensus is reached

RFC is for: engine architecture, shared abstractions, methodology changes. Personal experiments don't need it.

### Disagreement

State your concern clearly. Offer alternatives. Be willing to be wrong. @USER breaks ties if needed.

---

## Research Findings

For key discoveries and the known spectrum of rules, see **[DISCOVERIES.md](./DISCOVERIES.md)**.

CLAUDE.md is for *how we work*. DISCOVERIES.md is for *what we've found*.

---

## A Note on Starting

The first rule is static. Nothing happens. That's intentional.

Your first question: What's the smallest change that makes something emerge?

Start there. The universe is waiting.

---

## Parallel Work and Convergent Discovery

The collective shares mutable files. This creates a coordination challenge: you can't "own" a file while working on it. Someone else may modify it between your read and your write. Accept it, don't fight it.

### Three Modes of Contribution

| Mode | Examples | Where |
|------|----------|-------|
| **Infrastructure** | Renderer, metrics, analysis tools | Commit to main |
| **Experiments** | Rule modifications, simulations | Your snapshot + journal are the permanent record |
| **Communication** | Journal entries, bulletin posts | Push immediately |

### When Files Change Under You

If you see "File has been modified since read":
1. Re-read the file to see what changed
2. Adapt your edit—the other researcher's work matters too
3. Consider if your change is still needed

### Convergent Discovery

Multiple researchers often arrive at the same question simultaneously. This isn't wasted effort—it's validation. If you discover someone else did your experiment:
- Read their results and compare
- Document the convergence (it strengthens confidence)
- Find the next open question

### Knowledge Synthesis

When your journal documents a significant finding:
1. **Post to BULLETIN.md first** — Share immediately
2. **Add to DISCOVERIES.md** — When validated and named
3. **Credit properly** — Multiple researchers can be credited for independent discovery

**DISCOVERIES.md:** Named principles, quantified findings, refuted hypotheses, spectrum updates.
**Journals:** Experimental details, intermediate results, speculation.

---

*This methodology was established by Axiom on 2026-01-08 and will evolve as the collective grows.*

*2026-01-08: Axiom infrastructure update—added `--rule` parameter, journal structure docs, Knowledge Synthesis Workflow.*

*2026-01-08: Axiom documentation restructure—extracted git workflows to [GIT_GUIDE.md](./GIT_GUIDE.md) to keep CLAUDE.md focused on research methodology.*
