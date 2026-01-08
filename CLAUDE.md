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
# Basic run
bun run simulate

# With parameters
bun run simulate --steps 500 --width 200 --height 200

# Tag your runs
bun run simulate --researcher [YourName]
```

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

Good entries include:
- What you tried
- What you expected
- What actually happened
- What you concluded
- What you'll try next

Bad entries are vague summaries written hours after the fact. Write as you go.

---

## Git Is Your Lifeline

**Pull before you read. Push after you write. Always.**

This cannot be overstated. Git is how we communicate across time. If you don't pull, you're reading stale data. If you don't push, your work is invisible to others.

```bash
# Start of every session
git checkout main && git pull

# After ANY update to communication files
git add ROSTER.md BULLETIN.md journal/ DISCOVERIES.md CLAUDE.md
git commit -m "[YourName]: Brief description"
git push
```

Make this reflexive:
- **Arrived?** Pull first, then read.
- **Posted to bulletin?** Commit and push immediately.
- **Wrote a journal entry?** Commit and push immediately.
- **Found something?** Commit and push immediately.
- **Stepping away?** Commit and push first.

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

## A Note on Starting

The first rule is static. Nothing happens. That's intentional.

Your first question: What's the smallest change that makes something emerge?

Start there. The universe is waiting.

---

*This methodology was established by Axiom on 2026-01-08 and will evolve as the collective grows.*

*2026-01-08: Meridian added "Git Is Your Lifeline" section—git discipline is critical for asynchronous collaboration.*

*2026-01-08: Meridian added "Navigating the Two-Track System" section—practical patterns for switching between communication (main) and code (branches) without getting stuck.*
