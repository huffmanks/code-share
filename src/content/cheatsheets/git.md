---
title: Git
description: This cheat sheet features the most important and commonly used Git commands for easy reference.
updatedAt: 2025-01-22 17:56:21
groups:
  - title: Setup
    description: Configuring user information used across all local repositories
    items:
      - label: git config --global user.name “[firstname lastname]”
        description: Set a name that is identifiable for credit when reviewing version history.
        example: git config --global user.name "John Doe"
      - label: git config --global user.email “[valid-email]”
        description: Set an email address that will be associated with each history marker.
        example: git config --global user.email "john@email.com"
  - title: Starting a Project
    description: Commands to kick off a new project or connect to an existing one.
    items:
      - label: git init
        description: Start a new Git repository from scratch in your project folder.
        example: git init
      - label: git clone [url]
        description: Copy (or "clone") a remote repository to your computer.
        example: git clone https://github.com/user/repo.git
  - title: Basic Workflow
    description: The bread and butter of using Git day-to-day.
    items:
      - label: git status
        description: "What's going on? See which changes have been staged, which haven’t, and which files aren’t being tracked."
        example: git status
      - label: git add [file]
        description: "I’m ready to share! Add a file’s changes to the staging area."
        example: git add file.txt
      - label: git commit -m "[message]"
        description: "Seal the deal! Record your changes with a message explaining what you did."
        example: git commit -m "Added a feature to improve performance"
  - title: Undoing Changes
    description: Fixing mistakes or rolling back changes when things go sideways.
    items:
      - label: git reset --hard [commit]
        description: "Oops! Undo changes in your working directory and reset to a specific commit. No turning back!"
        example: git reset --hard abc123
      - label: git checkout -- [file]
        description: "Don’t save that! Revert changes in a file to the last committed state."
        example: git checkout -- file.txt
      - label: git revert [commit]
        description: "Clean slate! Create a new commit that undoes changes from a previous one."
        example: git revert abc123
  - title: Branching & Merging
    description: Managing different versions of your project simultaneously.
    items:
      - label: git branch
        description: "Show me the branches! List all branches in your repository."
        example: git branch
      - label: git branch [branch-name]
        description: "Make a new branch to try something different."
        example: git branch feature-xyz
      - label: git checkout [branch-name]
        description: "Let’s switch it up! Move to a different branch."
        example: git checkout feature-xyz
      - label: git merge [branch-name]
        description: "Bring it together! Combine changes from another branch into your current one."
        example: git merge feature-xyz
  - title: Working with Remotes
    description: Commands for collaborating with others on a shared repository.
    items:
      - label: git remote add origin [url]
        description: "Connect your local repository to a remote one."
        example: git remote add origin https://github.com/user/repo.git
      - label: git pull
        description: "Gimme what’s new! Fetch changes from the remote repository and merge them."
        example: git pull origin main
      - label: git push
        description: "Take my changes! Upload your commits to the remote repository."
        example: git push origin main
---
