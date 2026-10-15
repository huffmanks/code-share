---
title: terminal
description: Frequently used shell commands for file navigation, permissions, networking and more.
updatedAt: 2026-09-20 17:29:52
groups:
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
      - label: Monitor running processes
        description: Open interactive resource usage dashboard.
        platforms:
          - os: [macos, linux]
            code: top
          - os: [windows]
            code: taskmgr
      - label: List active processes
        description: List running processes with their IDs and resource usage.
        platforms:
          - os: [macos, linux]
            code: ps aux
          - os: [windows]
            codeLang: ps1
            code: tasklist
      - label: Search processes by name
        description: Find process IDs and names matching a search term.
        platforms:
          - os: [macos, linux]
            code: pgrep -ifl <search-term>
            example: pgrep -ifl chrome
            comment: Case-insensitive; output format varies between macOS and Linux.
          - os: [windows]
            code: Get-Process | Where-Object { $_.ProcessName -like "*<search-term>*" }
            codeLang: ps1
            example: Get-Process | Where-Object { $_.ProcessName -like "*chrome*" }
      - label: Terminate processes by name
        description: Send a termination signal to matching processes.
        platforms:
          - os: [macos, linux]
            code: pkill <process-name>
            example: pkill chrome
            comment: Matches process names, not app display names. Add -i for case-insensitive matching.
          - os: [windows]
            code: Stop-Process -Name <process-name>
            codeLang: ps1
            example: Stop-Process -Name chrome
      - label: Terminate processes by command line
        description: Terminate processes whose command lines match a pattern.
        platforms:
          - os: [macos, linux]
            code: pkill -f <search-term>
            example: pkill -if chrome
            comment: Add -i for case-insensitive matching. May match multiple processes.
          - os: [windows]
            code: Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -like "*<search-term>*" } | ForEach-Object { Stop-Process -Id $_.ProcessId }
            codeLang: ps1
            example: Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -like "*chrome*" } | ForEach-Object { Stop-Process -Id $_.ProcessId }
            comment: May match multiple processes; access to command lines can be restricted.
      - label: Force terminate processes
        description: Force-stop processes that do not terminate normally.
        platforms:
          - os: [macos, linux]
            code: pkill -9 <process-name>
            example: pkill -9 chrome
            comment: SIGKILL; cannot be caught or handled. Add -i for case-insensitive matching.
          - os: [windows]
            code: Stop-Process -Name <process-name> -Force
            codeLang: ps1
            example: Stop-Process -Name chrome -Force
      - label: Terminate process by PID
        description: Terminate a specific process using its ID.
        platforms:
          - os: [macos, linux]
            code: kill <PID>
            example: kill 1234
            comment: Add -9 after kill to force termination.
          - os: [windows]
            code: Stop-Process -Id <PID>
            codeLang: ps1
            example: Stop-Process -Id 1234
            comment: Add -Force to force termination.
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
        platforms:
          - os: [macos, linux, windows]
            code: tar -cvf archive.tar myfolder
      - label: Extract tar archive
        description: Unpack files from a tar container.
        platforms:
          - os: [macos, linux, windows]
            code: tar -xvf archive.tar
      - label: Create compressed tarball
        description: Package and gzip compress a directory structure.
        platforms:
          - os: [macos, linux, windows]
            code: tar -czvf archive.tar.gz myfolder
      - label: Extract compressed tarball
        description: Unpack and decompress a gzipped archive file.
        platforms:
          - os: [macos, linux, windows]
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
