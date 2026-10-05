---
title: Batch rename files
description: Batch rename files by removing a matching filename prefix.
tags: ["batch", "file"]
updatedAt: 2026-10-05 11:53:51
fragments:
  - filename: batch-rename-files-command
    label: Command
    language: sh
    position: 0
    code: |
      for f in Untitled-[0-9]*_[0-9]*_*; do mv -- "$f" "${f#Untitled-[0-9]*_[0-9]*_}"; done
---
