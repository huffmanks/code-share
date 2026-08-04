---
title: Compress multiple videos for mobile
description: Batch compress MP4 videos into smaller mobile-friendly HEVC files with preserved audio.
tags: ["batch", "compression", "ffmpeg", "video"]
updatedAt: 2026-08-04 11:24:11
fragments:
  - filename: compress-multiple-videos-mobile
    label: Command
    language: sh
    position: 0
    code: |
      # Input file: "$f"
      # Duration limit: first 7 seconds (-to 7)
      # Dynamic scale filter: sets max width/height to 480 while keeping aspect ratio (handles  landscape & portrait)
      # Video codec: x265 (HEVC)
      # CRF: 28 (constant rate factor quality setting)
      # Tag: hvc1 FourCC flag for native macOS / QuickTime / iOS compatibility
      # Audio: copy stream directly without re-encoding
      # Output file: replaces .mp4 extension with _small.mp4
      for f in *.mp4; do
        ffmpeg -i "$f" -to 7 -vf "scale='if(gt(iw,ih),480,-2)':'if(gt(iw,ih),-2,480)'" -c:v libx265 -crf 28 -tag:v hvc1 -c:a copy "${f%.mp4}_small.mp4"
      done
---
