---
title: nano
description: Essential nano shortcuts for navigation, selecting text, find/replace and more.
updatedAt: 2025-02-09 14:48:58
groups:
  - title: Navigation
    description: Move efficiently within a file using these commands.
    items:
      - label: Move to first line
        description: Moves to the first line of the file.
        commands:
          - steps:
              - key: CTRL
              - key: y
      - label: Move to last line
        description: Moves to the last line of the file.
        commands:
          - steps:
              - key: CTRL
              - key: v
      - label: Move to beginning of line
        description: Moves the cursor to the start of the current line.
        commands:
          - steps:
              - key: CTRL
              - key: a
      - label: Move to end of line
        description: Moves the cursor to the end of the current line.
        commands:
          - steps:
              - key: CTRL
              - key: e
      - label: Move to previous line
        description: Moves the cursor to the previous line.
        commands:
          - steps:
              - key: CTRL
              - key: p
      - label: Move to next line
        description: Moves the cursor to the next line.
        commands:
          - steps:
              - key: CTRL
              - key: n
      - label: Move to next word
        description: Moves the cursor forward one word at a time.
        commands:
          - steps:
              - key: CTRL
              - key: SPACE
      - label: Move to line number
        description: Moves the cursor to a specific line number.
        commands:
          - steps:
              - key: CTRL
              - key: _
  - title: Selecting Text
    description: Commands for selecting and cutting text.
    items:
      - label: Start selecting text
        description: Starts marking text for cut/copy operations.
        commands:
          - steps:
              - key: CTRL
              - key: SHIFT
              - key: "6"
      - label: Cut selected text
        description: Cuts the selected text and stores it in the buffer.
        commands:
          - steps:
              - key: CTRL
              - key: k
      - label: Paste text
        description: Pastes the last cut text.
        commands:
          - steps:
              - key: CTRL
              - key: u
  - title: Search and Replace
    description: Find text and perform replacements efficiently.
    items:
      - label: Search for a word
        description: Finds the next occurrence of a word in the file.
        commands:
          - steps:
              - key: CTRL
              - key: w
          - steps:
              - key: type word
              - key: ENTER
      - label: Search and replace
        description: Replaces text throughout the file.
        commands:
          - steps:
              - key: CTRL
              - key: "\\"
          - steps:
              - key: search term
              - key: ENTER
          - steps:
              - key: replacement
              - key: ENTER
  - title: Exiting Nano
    description: How to quit Nano safely.
    items:
      - label: Save and exit
        description: Writes changes to file and quits.
        commands:
          - steps:
              - key: CTRL
              - key: x
          - steps:
              - key: "y"
              - key: ENTER
      - label: Exit without saving
        description: Closes Nano without saving changes.
        commands:
          - steps:
              - key: CTRL
              - key: x
          - steps:
              - key: "n"
  - title: Miscellaneous
    description: Other useful Nano commands.
    items:
      - label: Display help
        description: Shows Nano's help documentation.
        commands:
          - steps:
              - key: CTRL
              - key: g
---
