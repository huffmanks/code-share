---
title: Merge audio and video
description: Merge matching MP4 and MP3 files into a single MP4 without re-encoding the video.
tags: ["audio", "batch", "ffmpeg", "muxing", "video"]
updatedAt: 2026-08-04 11:24:46
fragments:
  - filename: merge-audio-and-video
    label: Command
    language: sh
    position: 0
    code: |
      # Input video file: "$f"
      # Input audio file: matching base name with .mp3 extension
      # Video codec: copy stream directly without re-encoding
      # Audio codec: AAC (recommended for MP4 container compatibility)
      # Map streams: explicit 0:v (video from mp4) and 1:a (audio from mp3)
      # Shortest flag: automatically stops encoding when the shortest input stream (the video) ends
      # Output file: replaces .mp4 extension with _audio.mp4
      for f in *.mp4; do
        ffmpeg -i "$f" -i "${f%.mp4}.mp3" -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 -shortest "${f%.mp4}_audio.mp4"
      done
---
