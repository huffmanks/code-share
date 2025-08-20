---
title: terminal
description: Frequently used shell commands for file navigation, permissions, networking and more.
updatedAt: 2025-08-20 10:08:03
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
  - title: File Permissions and Ownership
    description: Managing file access rights and ownership.
    syntax: |
      # chmod numeric permissions overview:
      # Each digit represents permissions for: [Owner][Group][Others]
      # Add values for read(4), write(2), execute(1)
      #
      # Examples:
      # 7 = 4+2+1 = read, write, execute
      # 6 = 4+2   = read, write
      # 5 = 4+1   = read, execute
      # 4 = 4     = read
      # 3 = 2+1   = write, execute
      # 2 = 2     = write
      # 1 = 1     = execute
      # 0 = none
      #
      # Common chmod values:
      # 755 = rwx for owner, rx for group, rx for others
      # 644 = rw for owner, r for group, r for others
      # 700 = rwx for owner, none for group/others
    items:
      - label: chmod [mode] [file]
        description: Change file permissions (numeric or symbolic).
        code: chmod 644 myfile.txt
      - label: chmod +x [file]
        description: Make a file executable.
        code: chmod +x script.sh
      - label: chown [owner]:[group] [file]
        description: Change file owner and group.
        code: chown user:staff myfile.txt
      - label: ls -l
        description: View file permissions and ownership.
        code: ls -l
      - label: stat [file]
        description: Show detailed file status including permissions and ownership.
        code: stat myfile.txt
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
      - label: kill [pid]
        description: Terminate a process by its PID.
        code: kill 1234
      - label: kill -9 [pid]
        description: Force kill a process by its PID.
        code: kill -9 1234
      - label: pkill [name]
        description: Kill processes by name.
        code: pkill firefox
      - label: systemctl status [service]
        description: Show status of a systemd service.
        code: systemctl status nginx
      - label: systemctl restart [service]
        description: Restart a systemd service.
        code: systemctl restart nginx
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
  - title: Archiving and Compression
    description: Creating and extracting tarballs and zip files.
    syntax: |
      # tar common flags overview:
      # c = create new archive
      # x = extract archive
      # v = verbose (show files being processed)
      # f = specify filename of archive
      # z = compress with gzip (.tar.gz)
      # j = compress with bzip2 (.tar.bz2)
      # J = compress with xz (.tar.xz)
      #
      # Examples:
      # tar -cvf archive.tar files/   -> create tar
      # tar -xvf archive.tar          -> extract tar
      # tar -czvf archive.tar.gz dir/ -> create gzipped tar
      # tar -xzvf archive.tar.gz      -> extract gzipped tar
    items:
      - label: tar -cvf [archive.tar] [files]
        description: Create a tar archive from files or directories.
        code: tar -cvf archive.tar myfolder
      - label: tar -xvf [archive.tar]
        description: Extract a tar archive.
        code: tar -xvf archive.tar
      - label: tar -czvf [archive.tar.gz] [files]
        description: Create a compressed tarball (gzip).
        code: tar -czvf archive.tar.gz myfolder
      - label: tar -xzvf [archive.tar.gz]
        description: Extract a gzipped tarball.
        code: tar -xzvf archive.tar.gz
      - label: zip [archive.zip] [files]
        description: Create a zip archive.
        code: zip archive.zip myfile.txt myfolder/*
      - label: unzip [archive.zip]
        description: Extract a zip archive.
        code: unzip archive.zip
---
