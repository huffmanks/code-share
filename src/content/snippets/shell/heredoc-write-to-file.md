---
title: Heredoc write to file
description: "Write multiline text to a file using a shell heredoc while preserving line breaks and indentation."
tags: ["cat", "file", "heredoc"]
updatedAt: 2026-11-04 13:17:15
fragments:
  - filename: heredoc-write-to-file
    label: Command
    language: sh
    position: 0
    code: |
      cat << 'EOF' > file.txt
      line 1 content
        line 2 indented content
      EOF
---
