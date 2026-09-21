---
title: ffmpeg
description: Comprehensive media conversion, video/audio encoding, filtering, and streaming command reference.
updatedAt: 2026-09-20 19:42:44
groups:
  - title: Basic Usage & Inspection
    description: Simple commands for format conversion, stream inspection, and metadata management.
    items:
      - label: Convert Media File
        description: Converts a media file from one format to another.
        code: ffmpeg -i <input_file> <output_file>
        example: ffmpeg -i input.mov output.mp4
      - label: Display Media Metadata
        description: Displays stream details and metadata of a media file.
        code: ffmpeg -i <input_file>
        example: ffmpeg -i input.mp4
      - label: Set Title Metadata
        description: Sets the title metadata field in the media container.
        code: ffmpeg -i <input_file> -metadata title="<title>" <output_file>
        example: ffmpeg -i input.mp4 -metadata title="My Title" output.mp4
      - label: Set Creation Timestamp
        description: Adds or overrides the creation timestamp in metadata.
        code: ffmpeg -i <input_file> -metadata creation_time="<timestamp>" <output_file>
        example: ffmpeg -i input.mp4 -metadata creation_time="2024-01-01T12:00:00" output.mp4
  - title: Trimming and Cutting
    description: Cut or trim sections of media based on time with or without re-encoding.
    items:
      - label: Lossless Clip Cutting
        description: Cuts a portion of the video losslessly without re-encoding.
        code: ffmpeg -ss <start_time> -to <end_time> -i <input_file> -c copy <output_file>
        example: ffmpeg -ss 00:00:10 -to 00:00:20 -i input.mp4 -c copy output.mp4
      - label: Trim and Re-encode Media
        description: Trims part of a video and re-encodes it.
        code: ffmpeg -ss <start_time> -t <duration> -i <input_file> <output_file>
        example: ffmpeg -ss 10 -t 10 -i input.mp4 output.mp4
  - title: Video Encoding, Codecs & Compression
    description: Modern video codecs (AV1, HEVC, H.264), bitrate optimization, and size reduction.
    items:
      - label: Encode Video AV1
        description: Encodes video using the modern, high-efficiency AV1 codec via libsvtav1.
        code: ffmpeg -i <input_file> -c:v libsvtav1 -crf <crf_value> <output_file>
        example: ffmpeg -i input.mp4 -c:v libsvtav1 -crf 30 output.mp4
      - label: Encode Video H265 HEVC
        description: Encodes video using H.265 (HEVC) with constant rate factor.
        code: ffmpeg -i <input_file> -c:v libx265 -crf <crf_value> <output_file>
        example: ffmpeg -i input.mp4 -c:v libx265 -crf 28 output.mp4
      - label: Encode Video H264
        description: Encodes video using standard H.264 codec with constant rate factor.
        code: ffmpeg -i <input_file> -c:v libx264 -crf <crf_value> <output_file>
        example: ffmpeg -i input.mp4 -c:v libx264 -crf 23 output.mp4
      - label: Lower Video Bitrate
        description: Compresses video by setting a specific target bitrate.
        code: ffmpeg -i <input_file> -b:v <bitrate> <output_file>
        example: ffmpeg -i input.mp4 -b:v 1000k output.mp4
      - label: Copy All Streams
        description: Copies all media streams directly to a new container without re-encoding.
        code: ffmpeg -i <input_file> -c copy <output_file>
        example: ffmpeg -i input.mkv -c copy output.mp4
  - title: Audio Processing & Compression
    description: Comprehensive audio filtering, extraction, track management, and compression commands.
    items:
      - label: Compress Audio AAC
        description: Compresses audio using AAC codec at a specific bitrate.
        code: ffmpeg -i <input_file> -c:a aac -b:a <bitrate> <output_file>
        example: ffmpeg -i input.wav -c:a aac -b:a 192k output.m4a
      - label: Extract Audio Track
        description: Extracts the audio track and saves it as MP3 or high-quality audio.
        code: ffmpeg -i <input_file> -q:a 0 -map a <output_file>
        example: ffmpeg -i input.mp4 -q:a 0 -map a output.mp3
      - label: Remove Audio Track
        description: Outputs the video stream without any audio.
        code: ffmpeg -i <input_file> -an <output_file>
        example: ffmpeg -i input.mp4 -an output.mp4
      - label: Adjust Audio Volume
        description: Increases or decreases the audio volume level.
        code: ffmpeg -i <input_file> -af "volume=<factor>" <output_file>
        example: ffmpeg -i input.mp4 -af "volume=1.5" output.mp4
      - label: Set Stream Language
        description: Specifies the language tag for a particular audio stream.
        code: ffmpeg -i <input_file> -metadata:s:a:0 language=<lang_code> <output_file>
        example: ffmpeg -i input.mp4 -metadata:s:a:0 language=eng output.mp4
  - title: Video Filters & Transformations
    description: Apply visual transformations, cropping, rotation, and flipping to video content.
    items:
      - label: Rotate Clockwise
        description: Rotates the video frame clockwise.
        code: ffmpeg -i <input_file> -vf "transpose=<value>" <output_file>
        example: ffmpeg -i input.mp4 -vf "transpose=1" output.mp4
      - label: Flip Vertically
        description: Flips the video upside down vertically.
        code: ffmpeg -vf "vflip" -i <input_file> <output_file>
        example: ffmpeg -vf "vflip" -i input.mp4 output.mp4
      - label: Crop Video Frame
        description: Crops a portion of the video with specified dimensions.
        code: ffmpeg -vf "crop=<width>:<height>:<x>:<y>" -i <input_file> <output_file>
        example: ffmpeg -vf "crop=640:360:0:0" -i input.mp4 output.mp4
  - title: Images and Thumbnails
    description: Extract frames, generate thumbnails, or convert between image sequences and video.
    items:
      - label: Extract Single Frame
        description: Captures a single image frame at a specific timestamp.
        code: ffmpeg -ss <time> -i <input_file> -frames:v 1 <output_file>
        example: ffmpeg -ss 00:00:01 -i input.mp4 -frames:v 1 output.jpg
      - label: Generate Timed Thumbnails
        description: Creates thumbnail images at regular time intervals.
        code: ffmpeg -i <input_file> -vf fps=<fps_expression> <output_pattern>
        example: ffmpeg -i input.mp4 -vf fps=1/10 thumb_%03d.jpg
      - label: Image Sequence to Video
        description: Converts sequentially numbered images into a video file.
        code: ffmpeg -framerate <rate> -i <input_pattern> <output_file>
        example: ffmpeg -framerate 24 -i img_%03d.png output.mp4
  - title: Subtitles
    description: Extract, embed, or burn subtitles into video files.
    items:
      - label: Extract Subtitle Stream
        description: Saves a subtitle stream from an MKV file to an external file.
        code: ffmpeg -i <input_file> -map 0:s:0 <output_subs>
        example: ffmpeg -i input.mkv -map 0:s:0 subs.srt
      - label: Burn Subtitles in Video
        description: Renders external subtitles directly into the video frames.
        code: ffmpeg -i <input_file> -vf subtitles=<subs_file> <output_file>
        example: ffmpeg -i input.mp4 -vf subtitles=subs.srt output.mp4
      - label: Embed Subtitles Softly
        description: Adds subtitles to a container without burning or rendering them.
        code: ffmpeg -i <input_file> -i <subs_file> -c copy -c:s mov_text <output_file>
        example: ffmpeg -i input.mp4 -i subs.srt -c copy -c:s mov_text output.mp4
  - title: Network Streaming & Protocols
    description: Stream, broadcast, or receive media over network endpoints and live protocols.
    items:
      - label: Stream to RTMP Endpoint
        description: Sends a media stream to a live RTMP broadcast server.
        code: ffmpeg -re -i <input_file> -f flv <rtmp_url>
        example: ffmpeg -re -i input.mp4 -f flv rtmp://server/live/streamkey
      - label: Download HLS Stream
        description: Saves a live or recorded HLS stream URL into a local file.
        code: ffmpeg -i <stream_url> -c copy <output_file>
        example: ffmpeg -i https://example.com/playlist.m3u8 -c copy output.ts
---
