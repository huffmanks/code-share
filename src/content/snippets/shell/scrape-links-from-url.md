---
title: Scrape links from a url
description: Scrape and list all links from a URL using curl and grep, with options to include link names
language: shell
tags: ["curl", "grep", "url"]
createdAt: 2025-01-13 16:45:00
fragments:
  - title: responsive-grid-columns
    code: |
      #!/bin/bash

      # Function to display usage
      usage() {
      echo "Usage: $0 [-n] <url>"
      echo "  -n  Include link names (default is just URLs)"
      exit 1
      }

      # Parse options
      include_names=false
      while getopts ":n" opt; do
      case ${opt} in
          n )
          include_names=true
          ;;
          * )
          usage
          ;;
      esac
      done
      shift $((OPTIND -1))

      # Check if URL is provided
      if [ $# -lt 1 ]; then
      usage
      fi

      url=$1

      # Fetch and parse links
      html=$(curl -s "$url")
      if $include_names; then
      # Extract and print links with names
      echo "$html" | grep -oP '<a [^>]*href="[^"]*".*?>.*?</a>' | \
          sed -E 's/.*href="([^"]*)".*?>(.*?)<\/a>/URL: \1\nName: \2\n/' | \
          sed -E 's/<[^>]+>//g'  # Remove leftover HTML tags in names
      else
      # Extract and print just the URLs
      echo "$html" | grep -oP '<a [^>]*href="[^"]*"' | \
          sed -E 's/.*href="([^"]*)".*/\1/'
      fi
---
