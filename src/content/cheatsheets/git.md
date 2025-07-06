---
title: git
description: Commands for version control, branches, staging, history and undoing changes.
updatedAt: 2025-02-07 08:44:58
groups:
  - title: Undoing Changes
    description: Fixing mistakes or rolling back changes when things go sideways.
    items:
      - label: git reset --hard [commit]
        description: "Oops! Undo changes in your working directory and reset to a specific commit. No turning back!"
        code: git reset --hard abc123
      - label: git checkout -- [file]
        description: "Don’t save that! Revert changes in a file to the last committed state."
        code: git checkout -- file.txt
      - label: git revert [commit]
        description: "Clean slate! Create a new commit that undoes changes from a previous one."
        code: git revert abc123
      - label: git cherry-pick [commit]
        description: "Steal a commit! Apply changes from a specific commit to your current branch."
        code: git cherry-pick xyz789
      - label: git reflog
        description: "Time machine! See a history of all your local git actions, including resets and checkouts, to recover lost work."
        code: git reflog
  - title: Branching & Merging
    description: Managing different versions of your project simultaneously.
    items:
      - label: git branch
        description: "Show me the branches! List all branches in your repository."
        code: git branch
      - label: git branch [branch-name]
        description: "Make a new branch to try something different."
        code: git branch feature-xyz
      - label: git checkout [branch-name]
        description: "Let’s switch it up! Move to a different branch."
        code: git checkout feature-xyz
      - label: git merge [branch-name]
        description: "Bring it together! Combine changes from another branch into your current one."
        code: git merge feature-xyz
      - label: git rebase [branch-name]
        description: "Rewrite history! Integrate changes from one branch into another by reapplying commits. Useful for cleaning up history before merging."
        code: git rebase main
      - label: git branch -d [branch-name]
        description: "Delete a branch (if it’s already merged)."
        code: git branch -d feature-xyz
      - label: git branch -D [branch-name]
        description: "Force delete a branch (even if it’s not merged)."
        code: git branch -D feature-xyz
  - title: Working with Remotes
    description: Commands for collaborating with others on a shared repository.
    items:
      - label: git remote add origin [url]
        description: "Connect your local repository to a remote one."
        code: git remote add origin https://github.com/user/repo.git
      - label: git fetch
        description: "Download changes from a remote repository without merging them."
        code: git fetch origin
      - label: git pull
        description: "Download changes from a remote repository and merge them into your current branch."
        code: git pull origin main
      - label: git push
        description: "Upload changes from your local repository to a remote one."
        code: git push origin main
      - label: git remote -v
        description: "List all remote connections and their URLs."
        code: git remote -v
      - label: git remote update
        description: "Fetch all changes from all remotes."
        code: git remote update
  - title: Stashing
    description: Temporarily shelve changes you’ve made to your working directory.
    items:
      - label: git stash
        description: "Stash your changes away temporarily."
        code: git stash
      - label: git stash list
        description: "List all your stashed changes."
        code: git stash list
      - label: git stash apply [stash-id]
        description: "Apply a specific stash to your working directory."
        code: git stash apply stash@{0}
      - label: git stash pop
        description: "Apply the most recent stash and remove it from the stash list."
        code: git stash pop
      - label: git stash drop [stash-id]
        description: "Remove a specific stash."
        code: git stash drop stash@{0}
      - label: git stash clear
        description: "Remove all stashed entries."
        code: git stash clear
  - title: Rewriting History
    description: Changing existing commits (use with caution!).
    items:
      - label: git commit --amend
        description: "Modify the most recent commit."
        code: git commit --amend
      - label: git rebase -i [commit]
        description: "Interactive rebase: Edit, squash, or drop commits in a range."
        code: |
          # Edit the last 3 commits
          git rebase -i HEAD~3
      - label: git filter-branch
        description: "Rewrite history for a range of commits (powerful, but complex).  Use with extreme caution!"
        code: |
          # Very complex, see documentation
          git filter-branch --tree-filter ’...’ HEAD
  - title: Other Useful Commands
    description: Less common but helpful git commands.
    items:
      - label: git bisect
        description: "Binary search to find the commit that introduced a bug."
        code: git bisect start
      - label: git blame [file]
        description: "Show who made changes to each line of a file."
        code: git blame file.txt
      - label: git config --global user.name "[name]"
        description: "Set your global username."
        code: git config --global user.name "Your Name"
      - label: git config --global user.email "[email]"
        description: "Set your global email address."
        code: git config --global user.email "your.email@example.com"
      - label: git diff
        description: "Show changes between commits, branches, etc."
        code: git diff main feature-xyz
      - label: git log --graph
        description: "Visualize the branch and merge history in a graph format."
        code: git log --graph --decorate --oneline --all
---
