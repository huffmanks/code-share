---
title: Find directories by name
description: Search for directories matching a specific name pattern across the entire filesystem.
tags: ["directories", "find", "search"]
updatedAt: 2025-03-20 12:54:58
fragments:
  - filename: find-directories-by-name
    label: Command
    language: sh
    position: 0
    code: |
      # change nix for search term
      sudo find / -type d -iname '*nix*' 2>/dev/null
---
