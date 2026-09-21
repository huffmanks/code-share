---
title: git
description: Commands for version control, branches, staging, history and undoing changes.
updatedAt: 2026-09-20 19:15:56
groups:
  - title: Update Last Commit and Force Push
    description: Stage all changes, amend the latest commit and safely force push to remote.
    items:
      - label: Stage All Changes
        description: Stage all modified and new files.
        code: git add .
      - label: Amend Recent Commit
        description: Amend the most recent commit without changing its message.
        code: git commit --amend --no-edit
      - label: Force Push Safely
        description: Force push changes safely, ensuring no unexpected remote updates are overwritten.
        code: git push origin main --force-with-lease
  - title: Undoing Changes
    description: Fixing mistakes or rolling back changes when things go sideways.
    items:
      - label: Reset Hard to Commit
        description: Undo changes in your working directory and reset to a specific commit. No turning back!
        code: git reset --hard abc123
      - label: Revert File Changes
        description: Revert changes in a file to the last committed state.
        code: git checkout -- file.txt
      - label: Revert Previous Commit
        description: Create a new commit that undoes changes from a previous one.
        code: git revert abc123
      - label: Cherry Pick Commit
        description: Apply changes from a specific commit to your current branch.
        code: git cherry-pick xyz789
      - label: View Reference Log
        description: See a history of all your local git actions, including resets and checkouts, to recover lost work.
        code: git reflog
  - title: Branching & Merging
    description: Managing different versions of your project simultaneously.
    items:
      - label: List Branches
        description: List all branches in your repository.
        code: git branch
      - label: Create Branch
        description: Make a new branch to try something different.
        code: git branch feature-xyz
      - label: Switch Branch
        description: Move to a different branch.
        code: git checkout feature-xyz
      - label: Merge Branch
        description: Combine changes from another branch into your current one.
        code: git merge feature-xyz
      - label: Rebase Branch
        description: Integrate changes from one branch into another by reapplying commits. Useful for cleaning up history before merging.
        code: git rebase main
      - label: Delete Merged Branch
        description: Delete a branch if it is already merged.
        code: git branch -d feature-xyz
      - label: Force Delete Branch
        description: Force delete a branch even if it is not merged.
        code: git branch -D feature-xyz
  - title: Working with Remotes
    description: Commands for collaborating with others on a shared repository.
    items:
      - label: Add Remote Repository
        description: Connect your local repository to a remote one.
        code: git remote add origin https://github.com/user/repo.git
      - label: Fetch Remote Changes
        description: Download changes from a remote repository without merging them.
        code: git fetch origin
      - label: Pull Remote Changes
        description: Download changes from a remote repository and merge them into your current branch.
        code: git pull origin main
      - label: Push to Remote
        description: Upload changes from your local repository to a remote one.
        code: git push origin main
      - label: List Remotes
        description: List all remote connections and their URLs.
        code: git remote -v
      - label: Update All Remotes
        description: Fetch all changes from all remotes.
        code: git remote update
  - title: Stashing
    description: Temporarily shelve changes you’ve made to your working directory.
    items:
      - label: Stash Changes
        description: Stash your changes away temporarily.
        code: git stash
      - label: List Stashes
        description: List all your stashed changes.
        code: git stash list
      - label: Apply Specific Stash
        description: Apply a specific stash to your working directory.
        code: git stash apply <stash_id>
        example: git stash apply stash@{0}
      - label: Pop Recent Stash
        description: Apply the most recent stash and remove it from the stash list.
        code: git stash pop
      - label: Drop Specific Stash
        description: Remove a specific stash.
        code: git stash drop <stash_id>
        example: git stash drop stash@{0}
      - label: Clear All Stashes
        description: Remove all stashed entries.
        code: git stash clear
  - title: Rewriting History
    description: Changing existing commits (use with caution!).
    items:
      - label: Interactive Rebase
        description: Edit, squash, or drop commits in a range.
        code: git rebase -i <commit_range>
        example: git rebase -i HEAD~3
      - label: Filter Branch History
        description: Rewrite history for a range of commits. Use with extreme caution!
        code: git filter-branch --tree-filter '<command>' HEAD
        example: git filter-branch --tree-filter 'rm -f password.txt' HEAD
  - title: Other Useful Commands
    description: Less common but helpful git commands.
    items:
      - label: Binary Search Commit
        description: Binary search to find the commit that introduced a bug.
        code: git bisect start
      - label: Show Line Authors
        description: Show who made changes to each line of a file.
        code: git blame file.txt
      - label: Set Global Username
        description: Set your global username.
        code: git config --global user.name "Your Name"
      - label: Set Global Email
        description: Set your global email address.
        code: git config --global user.email "your.email@example.com"
      - label: Show Commit Differences
        description: Show changes between commits, branches, etc.
        code: git diff <commit_or_branch_1> <commit_or_branch_2>
        example: git diff main feature-xyz
      - label: Visualize History Graph
        description: Visualize the branch and merge history in a graph format.
        code: git log --graph --decorate --oneline --all
---
