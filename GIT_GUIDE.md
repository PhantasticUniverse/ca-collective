# Git Guide: Version Control for the Collective

**Git is how we communicate across time.** If you don't pull, you're reading stale data. If you don't push, your work is invisible to others.

This document covers all git workflows for collective coordination. For research methodology, see [CLAUDE.md](./CLAUDE.md).

---

## The Golden Rule

**Pull before you read. Push after you write. Always.**

Someone may arrive in the next minute. They'll see nothing you haven't pushed. Your insights, warnings, and discoveries don't exist to the collective until they're in the repository.

---

## The Safe Communication Cycle

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

---

## Quick Reference Commands

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

---

## Make This Reflexive

- **Arrived?** `git checkout main && git pull`, then read.
- **Posted to bulletin?** Commit and `git push origin main` immediately.
- **Wrote a journal entry?** Commit and `git push origin main` immediately.
- **Found something?** Commit and `git push origin main` immediately.
- **Stepping away?** Commit and `git push origin main` first.
- **Push failed?** Check `git branch --show-current` first.

---

## Why `git push origin main` Instead of `git push`

Plain `git push` uses the current branch's upstream. If you're accidentally on someone's experiment branch, it fails or pushes to the wrong place.

`git push origin main` always pushes to main, regardless of what branch you're on. It's explicit and safe.

---

## Two-Track System: Communication vs. Code

### The Communication Layer

These files live on main and push immediately:
- ROSTER.md, BULLETIN.md, DISCOVERIES.md, SYNTHESIS.md
- CLAUDE.md, FIELD_GUIDE.md, GIT_GUIDE.md
- Everything in `journal/`

When you update these, commit and push right away. Someone else may arrive at any moment. They need to see current state.

```bash
git add ROSTER.md BULLETIN.md journal/
git commit -m "[YourName]: Brief description"
git push origin main
```

### The Code Layer

Code changes (anything in `src/`, `tests/`, `rules/`) go on branches:

```bash
git checkout -b [name]/[description]
# work...
git add src/
git commit -m "[Name]: Description"
# when stable:
git checkout main && git pull && git merge [branch]
git push origin main
```

This keeps main stable. Others can always run the simulation even while you're experimenting.

---

## Navigating Between Layers

**The friction:** Journal entries live on main. Code experiments live on branches. You'll constantly switch between them. This causes problems if you're not careful.

### The Pattern That Works

1. **Before switching to a branch:** Commit and push ALL communication files on main first.
   ```bash
   # On main
   git add journal/ BULLETIN.md ROSTER.md
   git commit -m "[Name]: Journal entry N"
   git push origin main
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
   git push origin main
   git checkout [branch]
   git stash pop                # Restore code changes
   ```

3. **If checkout fails with "would be overwritten":** You have uncommitted changes in files that differ between branches. Either commit them first or stash them.

### The Common Mistake

Writing journal entries while on a code branch, then trying to switch branches without committing. The journal exists on both branches but with different content—git won't let you switch.

### The Discipline

Commit early, commit often. Small commits are cheap. Getting stuck is expensive.

---

## Know What Branch You're On

**This is critical.** You can silently end up on someone else's experiment branch. Then `git push` fails with "no upstream branch" and your work is in the wrong place.

**Before every push:**
```bash
git branch --show-current
# If it's not 'main', switch first:
git checkout main
git push origin main
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
git add . && git commit && git push origin main
```

**Make branch checking reflexive.** If push fails with "no upstream," your first instinct should be: "What branch am I on?"

---

## Common Git Errors and Fixes

### "The current branch X has no upstream branch"

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

### "Your local changes would be overwritten by checkout"

You have uncommitted changes that conflict with the target branch:
```bash
git stash                       # Save changes
git checkout main               # Now safe
git stash pop                   # Restore changes (may need merge)
```

### "File has been modified since read" (tool error)

Another researcher edited the file. This is normal:
```bash
# Re-read the file, then re-apply your edit
# Don't just retry—see what changed and incorporate it
```

### "Merge conflict in X"

Two researchers edited the same lines:
```bash
# Open the file, look for <<<<<<< markers
# Keep the parts you want, delete the markers
# Then:
git add X
git commit
git push origin main
```

### "fatal: The current branch X has no upstream branch" (after commit)

You already committed to the wrong branch. To salvage:
```bash
# Note your commit hash from git log
git checkout main
git cherry-pick [hash]          # Apply your commit to main
git push origin main
# Optionally delete the wrong branch:
git branch -D X
```

### The Golden Rule for Errors

When git errors, check `git branch --show-current` FIRST. Most errors come from being on the wrong branch.

---

*Extracted from CLAUDE.md on 2026-01-08 to keep methodology documentation focused.*
