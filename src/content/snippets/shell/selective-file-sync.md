---
title: Selective file sync
description: Scripts for finding files by name, building transfer lists and syncing matched files to another system.
tags: ["bash", "files", "rsync", "shell", "utils"]
updatedAt: 2026-06-13 18:04:20
fragments:
  - filename: send_files
    label: File script
    language: sh
    position: 0
    code: |
      #!/usr/bin/env bash

      set -Eeuo pipefail

      START_DIR="/path/to/your/directory"
      FILENAME_LIST="./files-list.txt"
      DESTINATION="{{HOSTNAME_VAR}}:~/incoming/files/"
      ERROR_LOG="./error.log"

      # --- TIER 2 CONFIGURATION ---
      # Add or remove any extensions you want Tier 2 to look for (do not include the dot)
      EXTENSIONS=("mp4" "mkv")

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

      declare -a file_paths=()

      while IFS= read -r filename || [[ -n "$filename" ]]; do
          filename="${filename%$'\r'}"

          [[ -z "$filename" ]] && continue
          [[ "${filename:0:1}" == "#" ]] && continue

          matches=()

          # --- TIER 1: Match Exact Filename with Extension ---
          while IFS= read -r path; do
              matches+=("$path")
          done < <(
              find "$START_DIR" -type f -iname "$filename" -exec realpath {} \; 2>>"$ERROR_LOG"
          )

          # --- TIER 2: Match Without Extension (Fallback via Config Array) ---
          if [[ ${#matches[@]} -eq 0 ]]; then
              base_name="${filename%.*}"

              # Dynamically build the find arguments for the extensions
              find_args=()
              for ext in "${EXTENSIONS[@]}"; do
                  if [[ ${#find_args[@]} -gt 0 ]]; then
                      find_args+=("-o")
                  fi
                  find_args+=("-iname" "${base_name}.${ext}")
              fi

              # Only run find if the EXTENSIONS array isn't empty
              if [[ ${#find_args[@]} -gt 0 ]]; then
                  while IFS= read -r path; do
                      matches+=("$path")
                  done < <(
                      find "$START_DIR" -type f \( "${find_args[@]}" \) -exec realpath {} \; 2>>"$ERROR_LOG"
                  )
              fi
          fi

          # --- FALLBACK: Skip and Log if absolutely nothing matches ---
          if [[ ${#matches[@]} -eq 0 ]]; then
              log_error "No matches found for exact file or video extensions: $filename"
              continue
          fi

          file_paths+=("${matches[@]}")

      done < "$FILENAME_LIST"

      mapfile -t file_paths < <(
          printf '%s\n' "${file_paths[@]}" | sort -u
      )

      if [[ ${#file_paths[@]} -eq 0 ]]; then
          log_error "No files matched any entries."
          exit 1
      fi

      echo "Found ${#file_paths[@]} files."
      echo "Files to transfer:"
      printf '  %s\n' "${file_paths[@]}"
      echo "Sending files to $DESTINATION..."

      rsync -avh --progress \
          --no-relative \
          --files-from=<(printf '%s\n' "${file_paths[@]}") \
          / \
          "$DESTINATION" \
          2>>"$ERROR_LOG"
  - filename: files-list
    label: Files list
    language: txt
    position: 1
    code: |
      # Files
      Final Destinations Bloodlines (2025).mp4
      my-pdf-file.pdf
      My Document
      my-results 2026-05

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

          echo "$SHOW: found ${#tv_paths[@]} files"
          if [[ ${#tv_paths[@]} -eq 0 ]]; then
              log_error "No matches for: $SHOW ($SEASON_RANGE)"
              continue
          fi

          mapfile -t tv_paths < <(printf '%s\n' "${tv_paths[@]}" | sort -u)

          echo "Sending ${#tv_paths[@]} files for $SHOW -> $DESTINATION"
          printf '%s\n' "${tv_paths[@]}"

          rsync -avh --progress \
              --no-relative \
              --files-from=<(printf '%s\n' "${tv_paths[@]}") \
              / \
              "$DESTINATION" \
              2>>"$ERROR_LOG"

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
