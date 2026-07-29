---
title: Check dirty Git repos
description: Recursively find Git repositories with uncommitted changes, unpushed commits or missing upstream branches.
tags: ["git", "recursive", "repository", "status"]
updatedAt: 2026-07-29 12:25:30
fragments:
  - filename: check-dirty-git-repos
    label: Command
    language: sh
    position: 0
    code: |
      for repo in **/.git(N/:h); do
        dirty=$(git -C "$repo" status --porcelain 2>/dev/null)
        unpushed=$(git -C "$repo" log @{u}..HEAD --oneline 2>/dev/null)
        no_upstream=$(git -C "$repo" rev-parse --abbrev-ref @{u} 2>&1 | grep -q "no upstream" && echo "No upstream branch configured")

        if [[ -n "$dirty" || -n "$unpushed" || -n "$no_upstream" ]]; then
          echo "========================================"
          echo "  $repo"
          echo "========================================"
          [[ -n "$dirty" ]] && echo "[Uncommitted Changes]\n$dirty\n"
          [[ -n "$unpushed" ]] && echo "[Unpushed Commits]\n$unpushed\n"
          [[ -n "$no_upstream" ]] && echo "[Warning] $no_upstream\n"
        fi
      done
---
