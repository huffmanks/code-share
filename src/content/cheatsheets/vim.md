---
title: vim
description: Essential Vim shortcuts for navigation, selecting text, editing and more.
updatedAt: 2025-03-17 14:57:47
groups:
  - title: Navigation
    description: Move efficiently within a file using these commands.
    items:
      - label: Move to beginning of line
        description: Jumps to the first character of the current line.
        commands:
          - steps:
              - key: "0"
      - label: Move to end of line
        description: Jumps to the last character of the current line.
        commands:
          - steps:
              - key: SHIFT
              - key: "4"
      - label: Move to a specific line
        description: Jumps to a specified line number.
        commands:
          - steps:
              - key: ":[line number]"
              - key: ENTER
      - label: Move forward one word
        description: Jumps to the beginning of the next word.
        commands:
          - steps:
              - key: w
      - label: Move backward one word
        description: Jumps to the beginning of the previous word.
        commands:
          - steps:
              - key: b
      - label: Move to matching bracket
        description: Jumps between matching parentheses, brackets, or braces.
        commands:
          - steps:
              - key: "%"
      - label: Tab (add indent)
        description: In insert mode, increases the indentation level.
        commands:
          - steps:
              - key: CTRL
              - key: t
      - label: Un-tab (remove indent)
        description: In insert mode, decreases the indentation level.
        commands:
          - steps:
              - key: CTRL
              - key: d
  - title: Selecting Text
    description: Commands for selecting, deselecting, and highlighting text, lines, or the entire file.
    items:
      - label: Select text
        description: Starts visual mode to select text character by character.
        commands:
          - steps:
              - key: "v"
        comment: "Use arrow keys to expand selection."
      - label: Select line
        description: Selects entire lines instead of characters.
        commands:
          - steps:
              - key: "V"
        comment: "Use up/down to extend selection by lines."
      - label: Select entire file
        description: Selects all text in the file.
        commands:
          - steps:
              - key: "ggVG"
      - label: Deselect selection
        description: Exits visual mode and clears selection.
        commands:
          - steps:
              - key: "ESC"
  - title: Editing
    description: Modify text with these essential Vim commands.
    items:
      - label: Insert mode
        description: Enters insert mode to start typing.
        commands:
          - steps:
              - key: "i"
              - key: "a"
            isAlternative: true
        comment: i=insert before cursor, a=append after cursor
      - label: Escape insert mode
        description: Escapes the insert mode.
        commands:
          - steps:
              - key: "ESC"
      - label: Replace a character
        description: Replaces the character under the cursor.
        commands:
          - steps:
              - key: "r"
              - key: "[new character]"
      - label: Change a word
        description: Deletes the word under the cursor and enters insert mode.
        commands:
          - steps:
              - key: "caw"
      - label: Delete a character
        description: Deletes the character under the cursor.
        commands:
          - steps:
              - key: "x"
      - label: Delete a word
        description: Deletes the word under the cursor.
        commands:
          - steps:
              - key: "daw"
      - label: Copy
        description: Copies the selected text or the current line.
        commands:
          - steps:
              - key: "y"
              - key: "yy"
            isAlternative: true
        comment: y=selected text, yy=current line
      - label: Cut
        description: Cuts the selected text or the current line.
        commands:
          - steps:
              - key: "d"
              - key: "dd"
            isAlternative: true
        comment: d=selected text, dd=current line
      - label: Paste
        description: Pastes the last cut or copied text at the cursor position.
        commands:
          - steps:
              - key: "p"
              - key: "P"
            isAlternative: true
        comment: p=after cursor, P=before cursor
      - label: Copy to system clipboard
        description: Copies the selected text or current line to the system clipboard.
        commands:
          - steps:
              - key: '"+y'
              - key: '"+yy'
            isAlternative: true
        comment: '"+y=selected text, "+yy=current line'
      - label: Cut to system clipboard
        description: Cuts the selected text or current line to the system clipboard.
        commands:
          - steps:
              - key: '"+d'
              - key: '"+dd'
            isAlternative: true
        comment: '"+d=selected text, "+dd=current line'
      - label: Paste from system clipboard
        description: Pastes text from the system clipboard into Vim.
        commands:
          - steps:
              - key: '"+p'
              - key: '"+P'
            isAlternative: true
        comment: '"+p=after cursor, "+P=before cursor'
      - label: Undo last change
        description: Reverts the last edit.
        commands:
          - steps:
              - key: "u"
      - label: Redo last undone change
        description: Reapplies the last undone change.
        commands:
          - steps:
              - key: "CTRL"
              - key: "r"
  - title: Search and Replace
    description: Find text and perform replacements efficiently.
    items:
      - label: Search for a word
        description: Finds the next occurrence of a word in the file.
        commands:
          - steps:
              - key: "/word"
              - key: "ENTER"
      - label: Search backward for a word
        description: Finds the previous occurrence of a word in the file.
        commands:
          - steps:
              - key: "?word"
              - key: "ENTER"
      - label: Repeat last search
        description: Moves to the next match of the last search.
        commands:
          - steps:
              - key: "n"
              - key: "N"
            isAlternative: true
        comment: n=forward, N=backward
      - label: Replace text globally
        description: Replaces all occurrences of a word with another in the whole file.
        commands:
          - steps:
              - key: ":%s/old/new/g"
              - key: "ENTER"
      - label: Replace text in the current line
        description: Replaces all occurrences of a word in the current line.
        commands:
          - steps:
              - key: ":s/old/new/g"
              - key: "ENTER"
  - title: Exiting Vim
    description: How to quit Vim safely.
    items:
      - label: Save and exit
        description: Writes changes to file and quits.
        commands:
          - steps:
              - key: ":wq"
              - key: "ENTER"
      - label: Quit without saving
        description: Exits Vim without saving changes.
        commands:
          - steps:
              - key: ":q!"
              - key: "ENTER"
      - label: Save without exiting
        description: Saves the file but stays in Vim.
        commands:
          - steps:
              - key: ":w"
              - key: "ENTER"
  - title: Windows and Tabs
    description: Manage multiple files and workspaces.
    items:
      - label: Open a new tab
        description: Opens a new tab in Vim.
        commands:
          - steps:
              - key: ":tabnew"
              - key: "ENTER"
      - label: Switch between tabs
        description: Moves to the next or previous tab.
        commands:
          - steps:
              - key: "gt"
              - key: "gT"
            isAlternative: true
        comment: gt=next, gT=previous
      - label: Split window horizontally
        description: Splits the window into two horizontal panes.
        commands:
          - steps:
              - key: "CTRL"
              - key: "w"
              - key: "s"
      - label: Split window vertically
        description: Splits the window into two vertical panes.
        commands:
          - steps:
              - key: "CTRL"
              - key: "w"
              - key: "v"
      - label: Switch between windows
        description: Moves the cursor between split windows.
        commands:
          - steps:
              - key: "CTRL"
              - key: "w"
              - key: "[arrow key]"
  - title: Miscellaneous
    description: Other useful Vim commands.
    items:
      - label: Show line numbers
        description: Displays line numbers in the editor.
        commands:
          - steps:
              - key: ":set number"
              - key: "ENTER"
      - label: Hide line numbers
        description: Hides line numbers in the editor.
        commands:
          - steps:
              - key: ":set nonumber"
              - key: "ENTER"
      - label: Enable syntax highlighting
        description: Turns on syntax highlighting.
        commands:
          - steps:
              - key: ":syntax on"
              - key: "ENTER"
      - label: Disable syntax highlighting
        description: Turns off syntax highlighting.
        commands:
          - steps:
              - key: ":syntax off"
              - key: "ENTER"
---
