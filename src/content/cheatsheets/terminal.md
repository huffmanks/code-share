---
title: terminal
description: Frequently used shell commands for file navigation, permissions, networking and more.
updatedAt: 2026-09-20 17:29:52
groups:
  - title: Navigation
    description: Moving around the file system.
    items:
      - label: Print working directory
        description: Output the absolute path of your current directory.
        code: pwd
      - label: Change directory
        description: Switch the active directory path.
        code: cd Documents
      - label: List directory contents
        description: Display files and folders in the current location.
        platforms:
          - os: [macos, linux]
            code: ls
          - os: [windows]
            code: dir
            codeLang: ps1
      - label: List files with details
        description: Display detailed file and folder attributes.
        platforms:
          - os: [macos, linux]
            code: ls -l
          - os: [windows]
            code: Get-ChildItem
            codeLang: ps1
      - label: List all including hidden
        description: Display all files including hidden system files.
        platforms:
          - os: [macos, linux]
            code: ls -a
          - os: [windows]
            code: Get-ChildItem -Force
            codeLang: ps1
      - label: Go up one level
        description: Navigate to the parent directory.
        code: cd ..
      - label: Go to home directory
        description: Navigate directly to the user home folder.
        code: cd ~
  - title: File Manipulation
    description: Creating, moving, and deleting files and directories.
    items:
      - label: Create empty file
        description: Initialize a new blank file on disk.
        platforms:
          - os: [macos, linux]
            code: touch myfile.txt
          - os: [windows]
            code: New-Item myfile.txt
            codeLang: ps1
      - label: Create directory
        description: Initialize a new folder on disk.
        code: mkdir mydirectory
      - label: Copy file or folder
        description: Duplicate files or directories to a new destination.
        platforms:
          - os: [macos, linux]
            code: cp myfile.txt mycopy.txt
          - os: [windows]
            code: Copy-Item myfile.txt mycopy.txt
            codeLang: ps1
      - label: Move or rename target
        description: Relocate or rename files and directories.
        platforms:
          - os: [macos, linux]
            code: mv myfile.txt newlocation/myfile.txt
          - os: [windows]
            code: Move-Item myfile.txt newlocation/
            codeLang: ps1
      - label: Remove file
        description: Delete a specific file from disk.
        platforms:
          - os: [macos, linux]
            code: rm myfile.txt
          - os: [windows]
            code: Remove-Item myfile.txt
            codeLang: ps1
      - label: Remove directory recursively
        description: Delete a folder and its entire contents.
        platforms:
          - os: [macos, linux]
            code: rm -r mydirectory
          - os: [windows]
            code: Remove-Item -Recurse mydirectory
            codeLang: ps1
      - label: Force remove file
        description: Delete a file forcefully without confirmation.
        platforms:
          - os: [macos, linux]
            code: rm -f myfile.txt
          - os: [windows]
            code: Remove-Item -Force myfile.txt
            codeLang: ps1
      - label: Force remove directory
        description: Delete a directory and contents forcefully.
        platforms:
          - os: [macos, linux]
            code: rm -rf mydirectory
          - os: [windows]
            code: Remove-Item -Recurse -Force mydirectory
            codeLang: ps1
  - title: Viewing Files
    description: Displaying the contents of files.
    items:
      - label: Display file content
        description: Output the complete text contents of a file.
        platforms:
          - os: [macos, linux]
            code: cat myfile.txt
          - os: [windows]
            code: Get-Content myfile.txt
            codeLang: ps1
      - label: View file paginated
        description: Inspect file contents one screen page at a time.
        platforms:
          - os: [macos, linux]
            code: less myfile.txt
          - os: [windows]
            code: Get-Content myfile.txt | more
            codeLang: ps1
            comment: space=scroll, q=quit
      - label: Display file head
        description: Output the opening lines of a file.
        platforms:
          - os: [macos, linux]
            code: head myfile.txt
          - os: [windows]
            code: Get-Content myfile.txt -Head 10
            codeLang: ps1
      - label: Display file tail
        description: Output the closing lines of a file.
        platforms:
          - os: [macos, linux]
            code: tail myfile.txt
          - os: [windows]
            code: Get-Content myfile.txt -Tail 10
            codeLang: ps1
      - label: Open text editor nano
        description: Launch text editor for quick inline modifications.
        platforms:
          - os: [macos, linux]
            code: nano myfile.txt
          - os: [windows]
            code: notepad myfile.txt
            codeLang: ps1
      - label: Open text editor vim
        description: Launch modal text editor for editing files.
        platforms:
          - os: [macos, linux]
            code: vi myfile.txt
          - os: [windows]
            code: notepad myfile.txt
            codeLang: ps1
  - title: Searching
    description: Finding files and content.
    items:
      - label: Find files and folders
        description: Locate files matching specific criteria recursively.
        platforms:
          - os: [macos, linux]
            code: find . -name "myfile.txt"
          - os: [windows]
            code: Get-ChildItem -Recurse -Filter "myfile.txt"
            codeLang: ps1
      - label: Search text pattern
        description: Scan file contents for matching string patterns.
        platforms:
          - os: [macos, linux]
            code: grep "hello" myfile.txt
          - os: [windows]
            code: Select-String -Pattern "hello" -Path myfile.txt
            codeLang: ps1
      - label: Locate executable path
        description: Resolve the absolute filesystem path of a tool.
        platforms:
          - os: [macos, linux]
            code: which ls
          - os: [windows]
            code: Get-Command ls
            codeLang: ps1
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
      - label: Modify file permissions
        description: Update numerical or symbolic access mode bits.
        platforms:
          - os: [macos, linux]
            code: chmod 644 myfile.txt
          - os: [windows]
            code: icacls myfile.txt /setintegritylevel medium
            codeLang: ps1
      - label: Make file executable
        description: Grant execution rights to a script file.
        platforms:
          - os: [macos, linux]
            code: chmod +x script.sh
          - os: [windows]
            code: Unblock-File -Path script.ps1
            codeLang: ps1
      - label: Change owner and group
        description: Reassign file ownership to a user and group.
        platforms:
          - os: [macos, linux]
            code: chown user:staff myfile.txt
          - os: [windows]
            code: icacls myfile.txt /setowner "Domain\User"
            codeLang: ps1
      - label: View detailed file status
        description: Inspect low-level file metadata and status properties.
        platforms:
          - os: [macos, linux]
            code: stat myfile.txt
          - os: [windows]
            code: Get-ItemProperty myfile.txt
            codeLang: ps1
  - title: System Information
    description: Getting information about the system.
    items:
      - label: Display system details
        description: Output host configuration and kernel version.
        platforms:
          - os: [macos, linux]
            code: uname -a
          - os: [windows]
            code: systeminfo
      - label: Check disk space usage
        description: Display storage volume capacity and availability.
        platforms:
          - os: [macos, linux]
            code: df -h
          - os: [windows]
            code: Get-PSDrive
            codeLang: ps1
      - label: Measure folder size
        description: Calculate total disk space consumed by a directory.
        platforms:
          - os: [macos, linux]
            code: du -sh Documents
          - os: [windows]
            code: Get-ChildItem Documents -Recurse | Measure-Object Length -Sum
            codeLang: ps1
      - label: Monitor running processes
        description: Open interactive resource usage dashboard.
        platforms:
          - os: [macos, linux]
            code: top
          - os: [windows]
            code: taskmgr
      - label: List active processes
        description: Output a snapshot list of active system processes.
        platforms:
          - os: [macos, linux]
            code: ps aux
          - os: [windows]
            code: tasklist
      - label: Terminate process by PID
        description: Send a stop signal to a process identifier.
        platforms:
          - os: [macos, linux]
            code: kill 1234
          - os: [windows]
            code: Stop-Process -Id 1234
            codeLang: ps1
      - label: Force terminate process
        description: Forcefully abort a process by its identifier.
        platforms:
          - os: [macos, linux]
            code: kill -9 1234
          - os: [windows]
            code: Stop-Process -Id 1234 -Force
            codeLang: ps1
      - label: Terminate processes by name
        description: Stop running processes matching a process name.
        platforms:
          - os: [macos, linux]
            code: pkill firefox
          - os: [windows]
            code: Stop-Process -Name firefox
            codeLang: ps1
      - label: Check service status
        description: Query the current operational state of a service.
        platforms:
          - os: [linux]
            code: systemctl status nginx
          - os: [macos]
            code: launchctl print system/nginx
          - os: [windows]
            code: Get-Service nginx
            codeLang: ps1
      - label: Restart system service
        description: Stop and start a system service daemon.
        platforms:
          - os: [linux]
            code: systemctl restart nginx
          - os: [macos]
            code: launchctl kickstart -k system/nginx
          - os: [windows]
            code: Restart-Service nginx
            codeLang: ps1
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
      - label: Create tar archive
        description: Package files into an uncompressed archive container.
        code: tar -cvf archive.tar myfolder
      - label: Extract tar archive
        description: Unpack files from a tar container.
        code: tar -xvf archive.tar
      - label: Create compressed tarball
        description: Package and gzip compress a directory structure.
        code: tar -czvf archive.tar.gz myfolder
      - label: Extract compressed tarball
        description: Unpack and decompress a gzipped archive file.
        code: tar -xzvf archive.tar.gz
      - label: Create zip archive
        description: Compress files into a standard zip format.
        platforms:
          - os: [macos, linux]
            code: zip archive.zip myfile.txt myfolder/*
          - os: [windows]
            code: Compress-Archive -Path myfile.txt, myfolder -DestinationPath archive.zip
            codeLang: ps1
      - label: Extract zip archive
        description: Decompress files from a zip archive container.
        platforms:
          - os: [macos, linux]
            code: unzip archive.zip
          - os: [windows]
            code: Expand-Archive -Path archive.zip -DestinationPath .
            codeLang: ps1
---
