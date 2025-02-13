---
title: Batch resize images
description: Batch resize and center images to a specific dimension.
tags: ["batch", "image", "imagemagick", "magick"]
updatedAt: 2025-02-13 14:41:20
fragments:
  - filename: batch-resize-images-command
    label: Command
    language: sh
    position: 0
    code: |
      # cd to directory with images
      # adjust size as necessary 1427x803 (resize, extent)
      # change output directory: ~/Downloads/output/"$file"
      for file in *.jpg; do
        magick "$file" -gravity center -resize '1427x803^' -extent 1427x803 ~/Downloads/output/"$file"
      done
---
