---
title: Compress video
description: Compress a video using the H.265 (HEVC) codec for a balance of quality and size.
tags: ["compression", "ffmpeg"]
updatedAt: 2025-04-14 16:08:39
fragments:
  - filename: compress-video
    label: Command
    language: sh
    position: 0
    code: |
      ffmpeg -i input.mp4 -vcodec libx265 -crf 28 -preset medium -tag:v hvc1 output.mp4
---
