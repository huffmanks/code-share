---
title: Paste to file over ssh
description: "Quickly paste clipboard content into a remote file over ssh using pbpaste and cat."
tags: ["cat", "pbpaste", "ssh"]
updatedAt: 2025-03-08 16:16:33
fragments:
  - filename: paste-to-file-over-ssh
    label: Command
    language: sh
    position: 0
    code: |
      # Content must be on your clipboard before executing
      pbpaste | ssh USERNAME@IP_ADDRESS 'cat > /path/to/file/compose.yml'
---
