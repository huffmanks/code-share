---
title: nano
description: Shortcut keys for editing, navigating and managing text inside the Nano editor.
updatedAt: 2025-02-09 14:48:58
groups:
  - title: Navigation
    description: Move efficiently within a file using these commands.
    items:
      - label: Move to first line
        description: Moves to the first line of the file.
        commands:
          - [CTRL, y]
          - [ESC, \]
      - label: Move to last line
        description: Moves to the last line of the file.
        commands:
          - [CTRL, v]
          - [ESC, /]
      - label: Move to beginning of line
        description: Moves the cursor to the start of the current line.
        commands:
          - [CTRL, a]
      - label: Move to end of line
        description: Moves the cursor to the end of the current line.
        commands:
          - [CTRL, e]
      - label: Move to previous line
        description: Moves the cursor to the previous line.
        commands:
          - [CTRL, p]
      - label: Move to next line
        description: Moves the cursor to the next line.
        commands:
          - [CTRL, n]
      - label: Move to previous word
        description: Moves the cursor backward one word at a time.
        commands:
          - [CTRL, ←]
          - [ALT, SPACE]
      - label: Move to next word
        description: Moves the cursor forward one word at a time.
        commands:
          - [CTRL, →]
          - [CTRL, SPACE]
      - label: Move to line number
        description: Moves the cursor to a specific line number.
        commands:
          - [CTRL, _]
          - [ESC, g]
  - title: Selecting Text
    description: Commands for selecting and cutting text.
    items:
      - label: Start selecting text
        description: Starts marking text for cut/copy operations.
        commands:
          - [CTRL, SHIFT, "6"]
          - [ESC, a]
      - label: Copy selected text
        description: Copies the selected text and stores it in the buffer.
        commands:
          - [ALT, "6"]
          - [ESC, "6"]
      - label: Cut selected text
        description: Cuts the selected text and stores it in the buffer.
        commands:
          - [CTRL, k]
      - label: Paste text
        description: Pastes the last cut text.
        commands:
          - [CTRL, u]
  - title: Search and Replace
    description: Find text and perform replacements efficiently.
    items:
      - label: Search for a word
        description: Finds the next occurrence of a word in the file.
        commands:
          - [CTRL, w]
          - [ESC, f]
        comment: "type word > ENTER"
      - label: Search and replace
        description: Replaces text throughout the file.
        commands:
          - [CTRL, "\\"]
          - [ESC, r]
        comment: "search term > ENTER > replacement > ENTER"
      - label: Find next occurrence
        description: Jump to the next match in the current search.
        commands:
          - [ALT, w]
          - [ESC, w]
  - title: Exiting Nano
    description: How to quit Nano safely.
    items:
      - label: Save and exit
        description: Writes changes to file and quits.
        commands:
          - [CTRL, x]
          - ["y", ENTER]
      - label: Exit without saving
        description: Closes Nano without saving changes.
        commands:
          - [CTRL, x]
          - ["n"]
  - title: Miscellaneous
    description: Other useful Nano commands.
    items:
      - label: Display help
        description: Shows Nano's help documentation.
        commands:
          - [CTRL, g]
      - label: Undo
        description: Revert the most recent change.
        commands:
          - [ALT, u]
          - [ESC, u]
      - label: Redo
        description: Reapply the most recently undone change.
        commands:
          - [ALT, e]
          - [ESC, e]
---
