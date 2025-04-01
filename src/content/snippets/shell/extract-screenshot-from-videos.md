---
title: Extract screenshot from videos
description: Extract screenshot from videos at a specific timestamp using ffmpeg.
tags: ["ffmpeg", "processing", "screenshot"]
updatedAt: 2025-04-01 16:21:34
fragments:
  - filename: extract-screenshot-from-videos
    label: Command
    language: sh
    position: 0
    code: |
      for f in *.mp4; do ffmpeg -ss 5 -i "$f" -frames:v 1 "${f%.mp4}.jpg"; done
---
