---
title: Add user to group
description: Manage user group membership and permissions to ensure proper access control over directories and files.
tags: ["chmod", "chown", "permissions", "usermod"]
updatedAt: 2025-03-25 19:16:06
fragments:
  - filename: add-user-to-group-01
    label: usermod
    language: sh
    position: 0
    code: |
      # Add user to primary_group
      sudo usermod -aG primary_group user
  - filename: add-user-to-group-02
    label: chown
    language: sh
    position: 1
    code: |
      # Change group ownership to directory
      sudo chown -R :primary_group /path/to/your/folder
  - filename: add-user-to-group-03
    label: group permissions
    language: sh
    position: 2
    code: |
      # Set group read/write/execute permissions
      sudo chmod -R g+rwX /path/to/your/folder
  - filename: add-user-to-group-04
    label: setgid
    language: sh
    position: 3
    code: |
      # Set the setgid so new files inherit the group
      sudo chmod g+s /path/to/your/folder
---
