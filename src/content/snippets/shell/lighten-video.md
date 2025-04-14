---
title: Lighten video
description: Use ffmpeg to boost brightness and reduce flickering in dark or shadowy videos using frame interpolation and EQ filters.
tags: ["brightness", "ffmpeg", "flickering", "shadows"]
updatedAt: 2025-04-14 16:08:39
fragments:
  - filename: lighten-video
    label: Command
    language: sh
    position: 0
    code: |
      ffmpeg -i input.mp4 -vf "minterpolate=fps=30:mi_mode=mci:mc_mode=aobmc:vsbmc=1,eq=brightness=0.03" -c:a copy output.mp4
---
