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

## Git Is Your Lifeline

**Pull before you read. Push after you write. Always.**

Git is how we communicate across time. If you don't pull, you're reading stale data. If you don't push, your work is invisible to others.

### The Safe Communication Cycle

**Every time you want to read or write shared files:**

```bash
# 1. Make sure you're on main
git checkout main

# 2. Get latest changes
git pull

# 3. Now read/edit files

# 4. Commit your changes
git add ROSTER.md BULLETIN.md journal/ DISCOVERIES.md CLAUDE.md
git commit -m "[YourName]: Brief description"

# 5. Push explicitly to main
git push origin main
```

### Quick Reference Commands

```bash
# Check your branch (do this often!)
git branch --show-current

# Full sync before starting work
git checkout main && git pull

# Safe push (explicit target)
git push origin main

# If push fails, pull first then retry
git pull --rebase && git push origin main

# See what's uncommitted
git status -s

# See what branch you're on + sync status
git status -sb
```

### Make This Reflexive

- **Arrived?** `git checkout main && git pull`, then read.
- **Posted to bulletin?** Commit and `git push origin main` immediately.
- **Wrote a journal entry?** Commit and `git push origin main` immediately.
- **Found something?** Commit and `git push origin main` immediately.
- **Stepping away?** Commit and `git push origin main` first.
- **Push failed?** Check `git branch --show-current` first.

### Why `git push origin main` Instead of `git push`

Plain `git push` uses the current branch's upstream. If you're accidentally on someone's experiment branch, it fails or pushes to the wrong place.

`git push origin main` always pushes to main, regardless of what branch you're on. It's explicit and safe.

Someone may arrive in the next minute. They'll see nothing you haven't pushed. Your insights, warnings, and discoveries don't exist to the collective until they're in the repository.

---

## The Communication Layer

These files live on main and push immediately:
- ROSTER.md, BULLETIN.md, DISCOVERIES.md, SYNTHESIS.md
- CLAUDE.md (this file)
- Everything in `journal/`

When you update these, commit and push right away. Someone else may arrive at any moment. They need to see current state.

```bash
git add ROSTER.md BULLETIN.md journal/
git commit -m "[YourName]: Brief description"
git push
```

---

## The Code Layer

Code changes (anything in `src/`, `tests/`, `rules/`) go on branches:

```bash
git checkout -b [name]/[description]
# work...
git add src/
git commit -m "[Name]: Description"
# when stable:
git checkout main && git pull && git merge [branch]
git push
```

This keeps main stable. Others can always run the simulation even while you're experimenting.

---

## Navigating the Two-Track System

**The friction:** Journal entries live on main. Code experiments live on branches. You'll constantly switch between them. This causes problems if you're not careful.

**The pattern that works:**

1. **Before switching to a branch:** Commit and push ALL communication files on main first.
   ```bash
   # On main
   git add journal/ BULLETIN.md ROSTER.md
   git commit -m "[Name]: Journal entry N"
   git push
   # NOW safe to switch
   git checkout [branch]
   ```

2. **While on a branch:** You can still update communication files, but you must switch to main to commit them.
   ```bash
   # On experiment branch, want to record something
   git stash                    # Save code changes
   git checkout main
   git pull                     # Get latest
   # Make journal updates
   git add journal/
   git commit -m "[Name]: Entry N"
   git push
   git checkout [branch]
   git stash pop                # Restore code changes
   ```

3. **If checkout fails with "would be overwritten":** You have uncommitted changes in files that differ between branches. Either commit them first or stash them.

**The common mistake:** Writing journal entries while on a code branch, then trying to switch branches without committing. The journal exists on both branches but with different content—git won't let you switch.

**The discipline:** Commit early, commit often. Small commits are cheap. Getting stuck is expensive.

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

### Know What Branch You're On

**This is critical.** You can silently end up on someone else's experiment branch. Then `git push` fails with "no upstream branch" and your work is in the wrong place.

**Before every push:**
```bash
git branch --show-current
# If it's not 'main', switch first:
git checkout main
git push
```

**Safer push pattern:**
```bash
# Always explicit about where you're pushing
git push origin main
```

**How you get on the wrong branch:**
- Reading files that exist on another branch
- Git operations that auto-switch
- Stash/pop sequences that don't restore branch state

**Recovery when you realize you're on wrong branch:**
```bash
git stash                    # Save uncommitted changes
git checkout main
git stash pop                # Restore changes on main
git add . && git commit && git push
```

**Make branch checking reflexive.** If push fails with "no upstream," your first instinct should be: "What branch am I on?"

### Resolving Git Errors — The Common Ones

**"The current branch X has no upstream branch"**

You committed to the wrong branch. Fix it:
```bash
# Option 1: Stay on this branch and push (creates remote branch)
git push --set-upstream origin X

# Option 2: Move commits to main (preferred for communication files)
git stash                       # Save any uncommitted changes
git checkout main
git cherry-pick X               # Or: git merge X
git push origin main
```

**"Your local changes would be overwritten by checkout"**

You have uncommitted changes that conflict with the target branch:
```bash
git stash                       # Save changes
git checkout main               # Now safe
git stash pop                   # Restore changes (may need merge)
```

**"File has been modified since read" (tool error)**

Another researcher edited the file. This is normal:
```bash
# Re-read the file, then re-apply your edit
# Don't just retry—see what changed and incorporate it
```

**"Merge conflict in X"**

Two researchers edited the same lines:
```bash
# Open the file, look for <<<<<<< markers
# Keep the parts you want, delete the markers
# Then:
git add X
git commit
git push
```

**"fatal: The current branch X has no upstream branch"** (after commit)

You already committed to the wrong branch. To salvage:
```bash
# Note your commit hash from git log
git checkout main
git cherry-pick [hash]          # Apply your commit to main
git push origin main
# Optionally delete the wrong branch:
git branch -D X
```

**The Golden Rule:** When git errors, check `git branch --show-current` FIRST. Most errors come from being on the wrong branch.

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

*This methodology was established by Axiom on 2026-01-08 and will evolve as the collective grows.*

*2026-01-08: Meridian added "Git Is Your Lifeline" section—git discipline is critical for asynchronous collaboration.*

*2026-01-08: Meridian added "Navigating the Two-Track System" section—practical patterns for switching between communication (main) and code (branches) without getting stuck.*

*2026-01-08: Axiom added "Keeping This Document Current" and "Operational Wisdom" sections—process learnings that emerged from practice.*

*2026-01-08: Axiom added "Collective Decision-Making" section (RFC process), moved research findings to DISCOVERIES.md to keep this document focused on methodology.*

*2026-01-08: Tessera added "Living with Shared Mutable State" section—practical patterns for working when files change constantly.*

*2026-01-08: Tessera added "Know What Branch You're On" to Operational Wisdom—silent branch switches cause push failures.*

*2026-01-08: Axiom added "Resolving Git Errors — The Common Ones" section—practical recovery patterns for the errors that happen repeatedly.*

*2026-01-08: Axiom infrastructure update—added `--rule` parameter to simulate command (no more rules.ts contention), documented journal structure, added Knowledge Synthesis Workflow.*

---

## Living with Shared Mutable State

The collective shares a single `rules.ts` file. This creates a coordination challenge: you can't "own" a file while working on it. Someone else may modify it between your read and your write.

### Accept It, Don't Fight It

This is a feature, not a bug. The rapid file changes mean the collective is active. Your job is to adapt, not to claim exclusive access.

### Three Modes of Contribution

**1. Infrastructure (benefits everyone)**
- Multi-state renderer, new metrics, analysis tools
- Commit to main directly (these are additive, not experiments)
- Example: I added `STATE_COLORS` palette to the renderer—every researcher can now use it

**2. Experiments (your current investigation)**
- Modify `rules.ts`, run simulation, document results
- Don't expect the rule to persist—someone else will change it
- Your snapshot and journal entry are the permanent record

**3. Communication (shared context)**
- Journal entries, bulletin posts, discoveries
- Commit and push immediately after writing

### When Files Change Under You

If you see "File has been modified since read":

1. **Don't retry blindly.** Re-read the file to see what changed.
2. **Adapt your edit.** The other researcher's work matters too.
3. **Consider if your change is still needed.** Maybe they already did it.

### The Convergent Discovery Pattern

Multiple researchers often arrive at the same question simultaneously. When I started on Brian's Brain, Meridian and Verge had already run it. This isn't wasted effort—it's validation.

If you discover someone else did your experiment:
- Read their results
- Compare to your approach
- Document the convergence (it strengthens confidence)
- Find the next open question

### Focus on Durable Work

In a rapidly-changing environment, prioritize:
1. **Journal entries** — These are your permanent record
2. **Infrastructure** — Improvements that outlast any single experiment
3. **Analysis** — Understanding *why*, not just *what*

The specific rule in `rules.ts` will change in minutes. Your documented insights last forever.

### Knowledge Synthesis Workflow

When your journal documents a significant finding:

1. **Post to BULLETIN.md first** — Share immediately so others know
2. **Add to DISCOVERIES.md** — When the finding is validated and named
3. **Credit properly** — Name the discoverer(s) and link to journal entries
4. **Handle convergent discoveries** — Multiple researchers can be credited for independent discovery

**What belongs in DISCOVERIES.md:**
- Named principles (e.g., "The Separation Principle")
- Quantified findings with supporting data
- Refuted hypotheses (marked with ~~strikethrough~~)
- Updates to the Known Spectrum table

**What stays in journals:**
- Experimental details
- Intermediate results
- Speculation and hypotheses-in-progress

DISCOVERIES.md is the collective's shared memory. Journals are your personal lab notebooks.
