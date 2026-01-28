---
title: Find largest files
description: List the largest files in a directory with optional limits.
tags: ["du", "filesystem", "find", "head"]
updatedAt: 2026-01-28 11:57:27
fragments:
  - filename: largest-files-function
    label: Function
    language: sh
    position: 0
    code: |
      largest_files() {
        local search_dir="${1:-.}"
        local num_results="${2:-10}"
        echo "Searching in: $search_dir for the top $num_results files..."
        /usr/bin/find "$search_dir" -type f -exec /usr/bin/du -ah {} + 2>/dev/null | /usr/bin/sort -rh | /usr/bin/head -n "$num_results"
      }
  - filename: largest-files-example
    label: Example
    language: sh
    position: 1
    code: |
      # Defaults search to pwd with 10 results. Can be modified by passing in args.

      # Example usage
      # largest_files ~/Library 5
---
