---
title: terminal
description: Frequently used shell commands for file navigation, permissions, networking and more.
updatedAt: 2025-02-07 09:22:11
groups:
  - title: Navigation
    description: Moving around the file system.
    items:
      - label: pwd
        description: Print working directory (shows your current location).
        code: pwd
      - label: cd [directory]
        description: Change directory.
        code: cd Documents
      - label: ls
        description: List files and directories.
        code: ls
      - label: ls -l
        description: List files and directories with details.
        code: ls -l
      - label: ls -a
        description: List all files and directories (including hidden ones).
        code: ls -a
      - label: cd ..
        description: Go up one directory.
        code: cd ..
      - label: cd ~
        description: Go to your home directory.
        code: cd ~
  - title: File Manipulation
    description: Creating, moving, and deleting files and directories.
    items:
      - label: touch [file]
        description: Create an empty file.
        code: touch myfile.txt
      - label: mkdir [directory]
        description: Create a new directory.
        code: mkdir mydirectory
      - label: cp [source] [destination]
        description: Copy a file or directory.
        code: cp myfile.txt mycopy.txt
      - label: mv [source] [destination]
        description: Move or rename a file or directory.
        code: mv myfile.txt newlocation/myfile.txt
      - label: rm [file]
        description: Remove a file.
        code: rm myfile.txt
      - label: rm -r [directory]
        description: Remove a directory and its contents (recursive).
        code: rm -r mydirectory
      - label: rm -f [file]
        description: Force remove a file (use with caution!).
        code: rm -f myfile.txt
      - label: rm -rf [directory]
        description: Force remove a directory and its contents (use with extreme caution!).
        code: rm -rf mydirectory
  - title: Viewing Files
    description: Displaying the contents of files.
    items:
      - label: cat [file]
        description: Display the contents of a file.
        code: cat myfile.txt
      - label: less [file]
        description: View a file one page at a time (use space to scroll, q to quit).
        code: less myfile.txt
      - label: head [file]
        description: Display the first few lines of a file.
        code: head myfile.txt
      - label: tail [file]
        description: Display the last few lines of a file.
        code: tail myfile.txt
      - label: nano [file]
        description: Open a file in the nano text editor.
        code: nano myfile.txt
      - label: vi/vim [file]
        description: Open a file in the vi/vim text editor.
        code: vi myfile.txt
  - title: Searching
    description: Finding files and content.
    items:
      - label: find [directory] [options] [expression]
        description: Find files and directories.
        code: find . -name "myfile.txt"
      - label: grep [pattern] [file]
        description: Search for a pattern in a file.
        code: grep "hello" myfile.txt
      - label: which [command]
        description: Show the location of a command.
        code: which ls
  - title: System Information
    description: Getting information about the system.
    items:
      - label: uname -a
        description: Display system information.
        code: uname -a
      - label: df -h
        description: Display disk space usage.
        code: df -h
      - label: du -sh [directory]
        description: Display directory size.
        code: du -sh Documents
      - label: top
        description: Display running processes.
        code: top
      - label: ps aux
        description: List all running processes.
        code: ps aux
  - title: Networking
    description: Commands related to network operations.
    items:
      - label: ping [host]
        description: Check network connectivity to a host.
        code: ping google.com
      - label: ifconfig
        description: Display network interface information (macOS/Linux).
        code: ifconfig
      - label: ipconfig
        description: Display network interface information (Windows).
        code: ipconfig
      - label: netstat
        description: Display network connections.
        code: netstat
      - label: curl [url]
        description: Transfer data from or to a server.
        code: curl https://www.example.com
      - label: wget [url]
        description: Download a file from a URL.
        code: wget https://www.example.com/file.zip
  - title: Package Management (macOS - Homebrew)
    description: Managing software packages with Homebrew.
    items:
      - label: brew install [package]
        description: Install a package.
        code: brew install wget
      - label: brew uninstall [package]
        description: Uninstall a package.
        code: brew uninstall wget
      - label: brew update
        description: Update Homebrew and its packages.
        code: brew update
      - label: brew search [package]
        description: Search for a package.
        code: brew search wget
      - label: brew list
        description: List installed packages.
        code: brew list
---
