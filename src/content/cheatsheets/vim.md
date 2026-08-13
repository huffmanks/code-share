---
title: vim
description: Navigation, editing and command shortcuts to work efficiently in Vim.
updatedAt: 2025-03-17 14:57:47
groups:
  - title: Navigation
    description: Move efficiently within a file using these commands.
    items:
      - label: Move to beginning of line
        description: Jumps to the first character of the current line.
        commands:
          - ["0"]
      - label: Move to end of line
        description: Jumps to the last character of the current line.
        commands:
          - [SHIFT, "4"]
      - label: Move to a specific line
        description: Jumps to a specified line number.
        commands:
          - [":[line number]", ENTER]
      - label: Move forward one word
        description: Jumps to the beginning of the next word.
        commands:
          - [w]
      - label: Move backward one word
        description: Jumps to the beginning of the previous word.
        commands:
          - [b]
      - label: Move to matching bracket
        description: Jumps between matching parentheses, brackets, or braces.
        commands:
          - ["%"]
      - label: Tab (add indent)
        description: In insert mode, increases the indentation level.
        commands:
          - [CTRL, t]
      - label: Un-tab (remove indent)
        description: In insert mode, decreases the indentation level.
        commands:
          - [CTRL, d]
  - title: Selecting Text
    description: Commands for selecting, deselecting, and highlighting text, lines, or the entire file.
    items:
      - label: Select text
        description: Starts visual mode to select text character by character.
        commands:
          - ["v"]
        comment: "Use arrow keys to expand selection."
      - label: Select line
        description: Selects entire lines instead of characters.
        commands:
          - ["V"]
        comment: "Use up/down to extend selection by lines."
      - label: Select entire file
        description: Selects all text in the file.
        commands:
          - ["ggVG"]
      - label: Deselect selection
        description: Exits visual mode and clears selection.
        commands:
          - ["ESC"]
  - title: Editing
    description: Modify text with these essential Vim commands.
    items:
      - label: Insert mode
        description: Enters insert mode to start typing.
        commands:
          - ["i"]
          - ["a"]
        comment: i=insert before cursor, a=append after cursor
      - label: Escape insert mode
        description: Escapes the insert mode.
        commands:
          - ["ESC"]
      - label: Replace a character
        description: Replaces the character under the cursor.
        commands:
          - ["r", "[new character]"]
      - label: Change a word
        description: Deletes the word under the cursor and enters insert mode.
        commands:
          - ["caw"]
      - label: Delete a character
        description: Deletes the character under the cursor.
        commands:
          - ["x"]
      - label: Delete a word
        description: Deletes the word under the cursor.
        commands:
          - ["daw"]
      - label: Copy
        description: Copies the selected text or the current line.
        commands:
          - ["y"]
          - ["yy"]
        comment: y=selected text, yy=current line
      - label: Cut
        description: Cuts the selected text or the current line.
        commands:
          - ["d"]
          - ["dd"]
        comment: d=selected text, dd=current line
      - label: Paste
        description: Pastes the last cut or copied text at the cursor position.
        commands:
          - ["p"]
          - ["P"]
        comment: p=after cursor, P=before cursor
      - label: Copy to system clipboard
        description: Copies the selected text or current line to the system clipboard.
        commands:
          - ['"+y']
          - ['"+yy']
        comment: '"+y=selected text, "+yy=current line'
      - label: Cut to system clipboard
        description: Cuts the selected text or current line to the system clipboard.
        commands:
          - ['"+d']
          - ['"+dd']
        comment: '"+d=selected text, "+dd=current line'
      - label: Paste from system clipboard
        description: Pastes text from the system clipboard into Vim.
        commands:
          - ['"+p']
          - ['"+P']
        comment: '"+p=after cursor, "+P=before cursor'
      - label: Undo last change
        description: Reverts the last edit.
        commands:
          - ["u"]
      - label: Redo last undone change
        description: Reapplies the last undone change.
        commands:
          - ["CTRL", "r"]
  - title: Search and Replace
    description: Find text and perform replacements efficiently.
    items:
      - label: Search for a word
        description: Finds the next occurrence of a word in the file.
        commands:
          - ["/word", "ENTER"]
      - label: Search backward for a word
        description: Finds the previous occurrence of a word in the file.
        commands:
          - ["?word", "ENTER"]
      - label: Repeat last search
        description: Moves to the next match of the last search.
        commands:
          - ["n"]
          - ["N"]
        comment: n=forward, N=backward
      - label: Replace text globally
        description: Replaces all occurrences of a word with another in the whole file.
        commands:
          - [":%s/old/new/g", "ENTER"]
      - label: Replace text in the current line
        description: Replaces all occurrences of a word in the current line.
        commands:
          - [":s/old/new/g", "ENTER"]
  - title: Exiting Vim
    description: How to quit Vim safely.
    items:
      - label: Save and exit
        description: Writes changes to file and quits.
        commands:
          - [":wq", "ENTER"]
      - label: Quit without saving
        description: Exits Vim without saving changes.
        commands:
          - [":q!", "ENTER"]
      - label: Save without exiting
        description: Saves the file but stays in Vim.
        commands:
          - [":w", "ENTER"]
  - title: Windows and Tabs
    description: Manage multiple files and workspaces.
    items:
      - label: Open a new tab
        description: Opens a new tab in Vim.
        commands:
          - [":tabnew", "ENTER"]
      - label: Switch between tabs
        description: Moves to the next or previous tab.
        commands:
          - ["gt"]
          - ["gT"]
        comment: gt=next, gT=previous
      - label: Split window horizontally
        description: Splits the window into two horizontal panes.
        commands:
          - ["CTRL", "w", "s"]
      - label: Split window vertically
        description: Splits the window into two vertical panes.
        commands:
          - ["CTRL", "w", "v"]
      - label: Switch between windows
        description: Moves the cursor between split windows.
        commands:
          - ["CTRL", "w", "[arrow key]"]
  - title: Miscellaneous
    description: Other useful Vim commands.
    items:
      - label: Show line numbers
        description: Displays line numbers in the editor.
        commands:
          - [":set number", "ENTER"]
      - label: Hide line numbers
        description: Hides line numbers in the editor.
        commands:
          - [":set nonumber", "ENTER"]
      - label: Enable syntax highlighting
        description: Turns on syntax highlighting.
        commands:
          - [":syntax on", "ENTER"]
      - label: Disable syntax highlighting
        description: Turns off syntax highlighting.
        commands:
          - [":syntax off", "ENTER"]
---
