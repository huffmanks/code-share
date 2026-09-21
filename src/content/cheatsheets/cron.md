---
title: cron
description: Learn how to schedule and automate tasks in Linux using cron jobs.
updatedAt: 2026-09-20 19:33:24
groups:
  - title: Task Scheduling & Management
    description: Common commands for checking, editing, and managing crontab jobs.
    items:
      - label: Check Service Status
        description: Ensure that the cron daemon service is installed and running.
        code: systemctl status <service_name>
        example: systemctl status cron
      - label: Edit User Crontab
        description: Open the crontab editor for the current user.
        code: crontab -e
      - label: List Scheduled Jobs
        description: View existing cron jobs for the current user.
        code: crontab -l
      - label: Remove All Jobs
        description: Clear the current user’s entire crontab.
        code: crontab -r
      - label: Edit System Crontab
        description: Open the system-wide crontab configuration file.
        code: sudo nano /etc/crontab
  - title: Syntax Blueprint
    description: Cron jobs use a five-field time format followed by the command to execute.
    syntax: |
      # ┌───────────── minute (0–59)
      # │ ┌───────────── hour (0–23)
      # │ │ ┌───────────── day of month (1–31)
      # │ │ │ ┌───────────── month (1–12)
      # │ │ │ │ ┌───────────── day of week (0–6, Sun=0)
      # │ │ │ │ │
      # * * * * * command_to_execute
  - title: Scheduling Examples
    description: Common practical examples of scheduling tasks with cron.
    items:
      - label: Run Daily at Midnight
        description: Executes a shell script every day at 12:00 AM.
        code: 0 0 * * * <script_path>
        example: 0 0 * * * /home/user/backup.sh
      - label: Run Every 15 Minutes
        description: Executes a python script at a frequent interval.
        code: "*/15 * * * * <interpreter> <script_path>"
        example: "*/15 * * * * /usr/bin/python3 /home/user/task.py"
      - label: Run Weekly Cleanup
        description: Executes a system maintenance command every Sunday at 3:00 AM.
        code: "0 3 * * 0 <command>"
        example: "0 3 * * 0 root /usr/bin/apt autoremove -y"
---
