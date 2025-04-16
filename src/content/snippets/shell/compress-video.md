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
      # Input: input.mp4
      # Video codec: x265 (HEVC)
      # CRF: 28 (default), recommended range 18-28
      # Encoding preset: medium (default), faster|fast|medium|slow|slower, etc.
      # Audio codec: aac
      # Audio bitrate: 128k (default), 96k|128k|192k|320k
      # Video tag: hvc1, can help with compatibility issues
      # Output: output.mp4
      ffmpeg -i input.mp4 -vcodec libx265 -crf 28 -preset medium -c:a aac -b:a 128k -tag:v hvc1 output.mp4
---
