---
title: Compress videos
description: A script to compress all videos in a directory using ffmpeg.
tags: ["ffmpeg", "script"]
updatedAt: 2025-01-19 20:41:00
fragments:
  - filename: compress-videos-script
    label: Shell script
    language: sh
    position: 0
    code: |
      #!/bin/bash

      # Default values
      vcodec="libx265"
      acodec="aac"
      output_format="mkv"
      crf=28
      preset="medium"

      # Function to show usage
      usage() {
      echo "Usage: $0 [options]"
      echo "Options:"
      echo "  --vcodec [libx264|libx265]   Video codec (default: libx265)"
      echo "  --acodec [aac|...]           Audio codec (default: aac)"
      echo "  --output-format [mp4|mkv]    Output format (default: mkv)"
      echo "  --crf [value]                Constant Rate Factor (default: 28)"
      echo "  --preset [preset]            Encoding preset (default: medium)"
      echo "  --help                       Show this help message"
      exit 1
      }

      # Parse command-line arguments
      while [[ $# -gt 0 ]]; do
      case "$1" in
          --vcodec)
          vcodec="$2"
          shift 2
          ;;
          --acodec)
          acodec="$2"
          shift 2
          ;;
          --output-format)
          output_format="$2"
          shift 2
          ;;
          --crf)
          crf="$2"
          shift 2
          ;;
          --preset)
          preset="$2"
          shift 2
          ;;
          --help)
          usage
          ;;
          *)
          echo "Unknown option: $1"
          usage
          ;;
      esac
      done

      # Create the output directory if it doesn't exist
      mkdir -p output

      # Process video files
      for file in *.{mp4,mov,avi,mkv}; do
      # Skip if no files are found
      [ ! -e "$file" ] && continue

      # Get creation date from metadata
      timestamp=$(ffprobe -v quiet -select_streams v:0 -show_entries format_tags=creation_time -of default=noprint_wrappers=1:nokey=1 "$file")

      # Format the timestamp to your desired format YYYY-MM-DD-HH-MM-SS
      formatted_timestamp=$(date -j -f "%Y-%m-%dT%H:%M:%S" "${timestamp%.*}" "+%Y-%m-%d-%H-%M-%S" 2>/dev/null)

      # If the timestamp is empty, use the current time instead
      [ -z "$formatted_timestamp" ] && formatted_timestamp=$(date "+%Y-%m-%d-%H-%M-%S")

      # Compress the video
      ffmpeg -i "$file" -vcodec "$vcodec" -crf "$crf" -preset "$preset" -acodec "$acodec" "output/${formatted_timestamp}.${output_format}"
      done

  - filename: compress-videos-commands
    label: Commands
    language: sh
    position: 1
    code: |
      # x265, aac, mkv
      ./video_convert.sh

      # x264, aac, mp4
      ./video_convert.sh --vcodec libx264 --acodec aac --output-format mp4
---
