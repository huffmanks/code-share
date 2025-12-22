#!/bin/bash

export PATH="$PATH:/tmp/.local/bin"
pip install --user ytdl-nfo --no-cache-dir

while true; do
  echo "--- Starting Maintenance Cycle ---"

  # 1. Generate NFOs
  ytdl-nfo /downloads

  # 2. Channel/Playlist Level: Create poster.jpg
  find /downloads -mindepth 2 -maxdepth 2 -type f \( -name "*.jpg" -o -name "*.png" \) | while read -r img; do
    ch_dir=$(dirname "$(dirname "$img")")
    if [ ! -f "$ch_dir/poster.jpg" ]; then
      cp "$img" "$ch_dir/poster.jpg"
      echo "Set channel poster: $ch_dir"
    fi
  done

  # 3. Cleanup: Delete episode folders missing an MP4
  find /downloads -mindepth 2 -maxdepth 2 -type d | while read -r dir; do

    # NEW GUARD: Only proceed if there is NO MP4 AND NO active MeTube lock files
    if [ -z "$(find "$dir" -maxdepth 1 -name "*.mp4")" ]; then

      # 1. Skip if there are active transfer files (.part, .ytdl, .tmp)
      if ls "$dir"/*.part "$dir"/*.ytdl "$dir"/*.tmp >/dev/null 2>&1; then
        continue
      fi

      # 2. Skip if the folder was modified recently (the 2-hour buffer)
      if [ -z "$(find "$dir" -maxdepth 0 -mmin +120)" ]; then
        continue
      fi

      # 3. CHECK FOR THE LOG: If MeTube just created this but it's restricted,
      # it might be an empty "Ghost" folder.
      # We only delete if it's truly abandoned.
      echo "No MP4 and no activity for 2 hours in $dir. Cleaning up..."
      rm -rf "$dir"
    fi
  done

  echo "Cycle complete. Sleeping 5m..."
  sleep 300
done