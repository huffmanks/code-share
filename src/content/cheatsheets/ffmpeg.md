---
title: ffmpeg
description: Video, audio and media commands for conversion, editing, compression and streaming.
updatedAt: 2025-07-06 19:19:20
groups:
  - title: Basic Usage
    description: Simple one-liners to perform basic ffmpeg operations.
    items:
      - label: Convert media
        description: Converts a file from one format to another.
        code: ffmpeg -i input.mov output.mp4
      - label: Show media info
        description: Displays stream details and metadata of a media file.
        code: ffmpeg -i input.mp4

  - title: Trimming and Cutting
    description: Cut or trim sections of media based on time without re-encoding or with re-encoding.
    items:
      - label: Cut clip without re-encoding
        description: Cuts a portion of the video losslessly.
        code: ffmpeg -ss 00:00:10 -to 00:00:20 -i input.mp4 -c copy output.mp4
      - label: Trim and re-encode
        description: Trims part of a video and re-encodes it.
        code: ffmpeg -ss 10 -t 10 -i input.mp4 output.mp4

  - title: Video Filters
    description: Apply visual transformations to video content.
    items:
      - label: Rotate 90 degrees clockwise
        description: Rotates the video frame clockwise.
        code: ffmpeg -i input.mp4 -vf "transpose=1" output.mp4
      - label: Flip vertically
        description: Flips the video upside down.
        code: ffmpeg -vf "vflip" -i input.mp4 output.mp4
      - label: Crop video
        description: Crops a portion of the video with specified dimensions.
        code: ffmpeg -vf "crop=640:360:0:0" -i input.mp4 output.mp4

  - title: Audio Filters
    description: Modify or extract audio from media files.
    items:
      - label: Remove audio track
        description: Outputs the video without any audio.
        code: ffmpeg -i input.mp4 -an output.mp4
      - label: Extract audio
        description: Extracts the audio track and saves it as MP3.
        code: ffmpeg -i input.mp4 -q:a 0 -map a output.mp3
      - label: Change audio volume
        description: Increases the audio volume by 50%.
        code: ffmpeg -i input.mp4 -af "volume=1.5" output.mp4

  - title: Compression and Quality
    description: Reduce file size or control video/audio quality using encoding options.
    items:
      - label: Compress video (H.264)
        description: Encodes video using H.264 codec with default quality.
        code: ffmpeg -i input.mp4 -vcodec libx264 -crf 23 output.mp4
      - label: Lower video bitrate
        description: Compresses video by setting a lower bitrate.
        code: ffmpeg -i input.mp4 -b:v 1000k output.mp4
      - label: Compress audio (MP3)
        description: Compresses audio using MP3 codec at 192 kbps.
        code: ffmpeg -i input.wav -b:a 192k output.mp3

  - title: Images and Thumbnails
    description: Extract frames, generate thumbnails or convert between image sequences and video.
    items:
      - label: Extract frame at specific time
        description: Captures a single frame at the 1-second mark.
        code: ffmpeg -ss 00:00:01 -i input.mp4 -frames:v 1 output.jpg
      - label: Generate thumbnails every 10 seconds
        description: Creates thumbnail images at 10-second intervals.
        code: ffmpeg -i input.mp4 -vf fps=1/10 thumb_%03d.jpg
      - label: Convert image sequence to video
        description: Converts sequentially numbered images to a video.
        code: ffmpeg -framerate 24 -i img_%03d.png output.mp4

  - title: Streams and Codecs
    description: Inspect or change audio/video codecs and manage streams.
    items:
      - label: Change video codec to H.265
        description: Re-encodes video using H.265 (HEVC).
        code: ffmpeg -i input.mp4 -c:v libx265 output.mp4
      - label: Copy all streams without re-encoding
        description: Copies all media streams directly to a new container.
        code: ffmpeg -i input.mkv -c copy output.mp4

  - title: Metadata
    description: Add or modify metadata such as title, creation time and language.
    items:
      - label: Set title metadata
        description: Sets the title field in the media metadata.
        code: ffmpeg -i input.mp4 -metadata title="My Title" output.mp4
      - label: Set creation time
        description: Adds or overrides the creation timestamp in metadata.
        code: ffmpeg -i input.mp4 -metadata creation_time="2024-01-01T12:00:00" output.mp4
      - label: Set stream language
        description: Specifies the language for a particular audio stream.
        code: ffmpeg -i input.mp4 -metadata:s:a:0 language=eng output.mp4

  - title: Subtitles
    description: Extract, embed or burn subtitles into videos.
    items:
      - label: Extract subtitles from MKV
        description: Saves subtitle stream to an external .srt file.
        code: ffmpeg -i input.mkv -map 0:s:0 subs.srt
      - label: Burn subtitles into video
        description: Renders external subtitles directly into the video.
        code: ffmpeg -i input.mp4 -vf subtitles=subs.srt output.mp4
      - label: Embed subtitles without burning
        description: Adds subtitles to a container without rendering them.
        code: ffmpeg -i input.mp4 -i subs.srt -c copy -c:s mov_text output.mp4

  - title: Streaming and Network
    description: Stream or receive media over the network using ffmpeg.
    items:
      - label: Stream to RTMP server
        description: Sends a media stream to a live RTMP endpoint.
        code: ffmpeg -re -i input.mp4 -f flv rtmp://server/live/streamkey
      - label: Download HLS stream
        description: Saves a stream from an HLS URL into a local file.
        code: ffmpeg -i https://example.com/playlist.m3u8 -c copy output.ts
---
