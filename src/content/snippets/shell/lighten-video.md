---
title: Lighten video
description: Enhance dark or underexposed videos in FFmpeg by improving brightness, clarity and overall visual quality while preserving a natural look.
tags: ["brightness", "ffmpeg", "flickering", "shadows", "video"]
updatedAt: 2026-08-02 16:10:39
fragments:
  - filename: lighten-video-01
    label: Method 1
    language: sh
    position: 0
    code: |
      # To make brighter adjust +20 in increments of 10
      ffmpeg -i input.mp4 -vf "hqdn3d=1.5:1.5:3:3,lutyuv=y='val+20*(1-val/255)':u='val':v='val',eq=contrast=1.08:saturation=1.15" -c:v libx265 -crf 20 -tag:v hvc1 -metadata creation_time="2025-11-21T14:33:00Z" -c:a copy output.mp4
  - filename: lighten-video-02
    label: Method 2
    language: sh
    position: 0
    code: |
      ffmpeg -i input.mp4 -vf "minterpolate=fps=30:mi_mode=mci:mc_mode=aobmc:vsbmc=1,eq=brightness=0.03" -c:a copy output.mp4
---
