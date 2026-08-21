---
title: Download video
description: Download an HLS video stream from an M3U8 playlist and save it as an MP4 without re-encoding the video or audio.
tags: ["download", "ffmpeg", "hls", "m3u8", "stream", "video"]
updatedAt: 2026-08-21 16:08:58
fragments:
  - filename: download-video
    label: Command
    language: sh
    position: 0
    code: |
      # -i: Input M3U8/HLS playlist URL.
      # -c copy: Copy the existing video and audio streams without re-encoding.
      # -bsf aac_adtstoasc: Convert AAC audio from ADTS to the format expected by MP4.
      ffmpeg -i "https://your-link.tld/xxxxxxxxx.m3u8" -c copy -bsf:a aac_adtstoasc output.mp4
---
