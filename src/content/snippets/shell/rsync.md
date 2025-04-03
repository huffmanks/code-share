---
title: "Rsync local and remote examples"
description: "Learn how to sync files between drives or remote systems using rsync."
tags: ["backup", "file sync", "rsync"]
updatedAt: 2025-04-03 16:30:52
fragments:
  - filename: rsync-local
    label: Local
    language: sh
    position: 0
    code: |
      rsync -av --progress --delete-before --exclude-from="exclude-list.txt" /path/to/HDD1 /path/to/HDD2
  - filename: rsync-remote
    label: Remote
    language: sh
    position: 1
    code: |
      rsync -av --progress --delete-before --exclude-from="exclude-list.txt" /path/to/HDD1 user@remote:/path/to/HDD2
  - filename: exclude-list
    label: Exclude list
    language: txt
    position: 2
    code: |
      .DS_Store
      .DS_Store?
      ._*
      .Spotlight-V100
      .Trashes
      ehthumbs.db
      Thumbs.db
      desktop.ini
---
