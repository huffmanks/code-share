---
title: Selective file sync
description: Scripts for finding files by name, building transfer lists and syncing matched files to another system.
tags: ["bash", "files", "rsync", "shell", "utils"]
updatedAt: 2026-06-13 18:04:20
fragments:
  - filename: send_movies
    label: Movies script
    language: sh
    position: 0
    code: |
      #!/usr/bin/env bash

      set -Eeuo pipefail

      START_DIR="/path/to/your/directory"
      FILENAME_LIST="./movies.txt"
      DESTINATION="{{HOSTNAME_VAR}}:~/incoming/movies/"
      ERROR_LOG="./error.log"

      : > "$ERROR_LOG"

      log_error() {
          echo "[$(date '+%F %T')] $*" >> "$ERROR_LOG"
      }

      trap 'log_error "Script failed on line $LINENO with exit code $?"' ERR

      [[ -d "$START_DIR" ]] || {
          log_error "START_DIR does not exist: $START_DIR"
          exit 1
      }

      [[ -f "$FILENAME_LIST" ]] || {
          log_error "FILENAME_LIST does not exist: $FILENAME_LIST"
          exit 1
      }

      declare -a movie_paths=()

      while IFS= read -r filename || [[ -n "$filename" ]]; do
          [[ -z "$filename" ]] && continue
          [[ "${filename:0:1}" == "#" ]] && continue

          matches=()

          while IFS= read -r path; do
              matches+=("$path")
          done < <(
              find "$START_DIR" -type f \
                  \( -iname "${filename}.mp4" -o -iname "${filename}.mkv" \) \
                  -exec realpath {} \; \
                  2>>"$ERROR_LOG"
          )

          if [[ ${#matches[@]} -eq 0 ]]; then
              log_error "No matches found for: $filename"
              continue
          fi

          movie_paths+=("${matches[@]}")

      done < "$FILENAME_LIST"

      mapfile -t movie_paths < <(
          printf '%s\n' "${movie_paths[@]}" | sort -u
      )

      if [[ ${#movie_paths[@]} -eq 0 ]]; then
          log_error "No files matched any entries."
          exit 1
      fi

      echo "Found ${#movie_paths[@]} files."
      echo "Files to transfer:"
      printf '  %s\n' "${movie_paths[@]}"

      for src in "${movie_paths[@]}"; do
          filename=$(basename "$src")
          movie_dir="${filename%.*}"

          echo "Copying:"
          echo "  $src"
          echo "  -> ${DESTINATION}${movie_dir}/"

          rsync -avh --progress \
              "$src" \
              "${DESTINATION}${movie_dir}/" \
              2>>"$ERROR_LOG"
      done
  - filename: movies-list
    label: Movies list
    language: txt
    position: 1
    code: |
      # MOVIES
      # e.g. Black Hawk Down (2001)
      Final Destinations Bloodlines (2025)
      Happy Gilmore 2 (2025)

  - filename: send_tv_shows
    label: TV shows script
    language: sh
    position: 2
    code: |
      #!/usr/bin/env bash

      set -Euo pipefail

      START_DIR="/path/to/your/directory"
      INPUT_FILE="./tv-shows.txt"
      DEST_ROOT="{{HOSTNAME_VAR}}:~/incoming/tv-shows"
      ERROR_LOG="./error.log"

      > "$ERROR_LOG"

      log_error() {
          echo "[$(date '+%F %T')] $*" >> "$ERROR_LOG"
      }

      trap 'log_error "Script failed on line $LINENO with exit code $?"' ERR

      while IFS='|' read -r SHOW SEASON_RANGE || [[ -n "$SHOW" ]]; do
          echo "PROCESSING: '$SHOW' '$SEASON_RANGE'"

          [[ -z "$SHOW" || -z "$SEASON_RANGE" ]] && continue
          [[ "${SHOW:0:1}" == "#" ]] && continue

          TV_SHOW_NAME="${SHOW//\//-}"

          DESTINATION="${DEST_ROOT}/${TV_SHOW_NAME}/"

          if [[ "$SEASON_RANGE" =~ ^S([0-9]{2})-S([0-9]{2})$ ]]; then
              start=$((10#${BASH_REMATCH[1]}))
              end=$((10#${BASH_REMATCH[2]}))
          elif [[ "$SEASON_RANGE" =~ ^S([0-9]{2})$ ]]; then
              start=$((10#${BASH_REMATCH[1]}))
              end=$start
          else
              log_error "Invalid season format: $SEASON_RANGE for $SHOW"
              continue
          fi

          tv_paths=()

          for ((s=start; s<=end; s++)); do
              season=$(printf "S%02d" "$s")

              mapfile -t matches < <(
                  find "$START_DIR" -type f \
                          \( \
                              -iname "*${SHOW}*${season}*.mkv" \
                              -o -iname "*${SHOW}*${season}*.mp4" \
                          \) \
                      -exec realpath {} \; \
                      2>>"$ERROR_LOG"
              )

              tv_paths+=("${matches[@]}")
          done

          if [[ ${#tv_paths[@]} -eq 0 ]]; then
              log_error "No matches for: $SHOW ($SEASON_RANGE)"
              continue
          fi

          mapfile -t tv_paths < <(printf '%s\n' "${tv_paths[@]}" | sort -u)

          echo "$SHOW: found ${#tv_paths[@]} files"
          echo "Sending ${#tv_paths[@]} files for $SHOW"

          for src in "${tv_paths[@]}"; do
              filename=$(basename "$src")

              if [[ "$filename" =~ [Ss]([0-9]{2})[Ee][0-9]{2} ]]; then
                  season_num="${BASH_REMATCH[1]}"
                  season_dir="Season ${season_num}"
              else
                  log_error "Could not determine season from filename: $filename"
                  continue
              fi

              echo "Copying:"
              echo "  $src"
              echo "  -> ${DESTINATION}${season_dir}/"

              rsync -avh --progress \
                  "$src" \
                  "${DESTINATION}${season_dir}/" \
                  2>>"$ERROR_LOG"
          done

      done < "$INPUT_FILE"
  - filename: tv-shows
    label: TV shows list
    language: txt
    position: 3
    code: |
      # TV SHOWS
      # e.g. Show Name|S01
      # Breaking Bad|S01-S02
      The Rookie|S08
      Family Guy|S01-S02
---
