---
title: Add title attribute to link
description: Regex pattern to add link text to title attribute
tags: ["regex", "url"]
updatedAt: 2025-01-13 16:07:00
fragments:
  - filename: add-title-attribute-to-link-pattern
    label: Pattern
    language: sh
    position: 0
    code: |
      # Find all <a> tags and capture href and text into groups 1, 2
      # $1 is ([^"]+) matches any character except "
      # $2 is ([^<]+) matches any character except <
      <a\s+href="([^"]+)"[^>]*>([^<]+)</a>
  - filename: add-title-attribute-to-link-replacement
    label: Replacement
    language: sh
    position: 1
    code: |
      # Add title attribute to <a> tags
      <a href="$1" target="_blank" rel="noopener" title="$2">$2</a>
---
