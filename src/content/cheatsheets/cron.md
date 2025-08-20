---
title: cron
description: Learn how to schedule and automate tasks in Linux using cron jobs.
updatedAt: 2025-08-20 09:30:29
groups:
  - title: Commands
    description: Common commands for checking, editing and managing cron jobs.
    items:
      - label: Check cron service
        description: Ensure that the cron service is installed and running.
        code: "systemctl status cron"
      - label: Edit user crontab
        description: Open the crontab editor for the current user.
        code: "crontab -e"
      - label: List scheduled jobs
        description: View existing cron jobs for the current user.
        code: "crontab -l"
      - label: Remove all jobs
        description: Clear the user’s crontab.
        code: "crontab -r"
      - label: Automate with system-wide crontab
        description: System jobs can be placed in /etc/crontab
        code: "sudo nano /etc/crontab"
  - title: Syntax
    description: Cron jobs use a five-field time format followed by the command to execute.
    syntax: |
      # ┌───────────── minute (0–59)
      # │ ┌───────────── hour (0–23)
      # │ │ ┌───────────── day of month (1–31)
      # │ │ │ ┌───────────── month (1–12)
      # │ │ │ │ ┌───────────── day of week (0–6, Sun=0)
      # │ │ │ │ │
      # │ │ │ │ │
      # * * * * * command_to_execute
  - title: Examples
    description: Common examples of scheduling tasks with cron.
    items:
      - label: Run script every day at midnight
        code: "0 0 * * * /home/username/backup.sh"
      - label: Run a task every 15 minutes
        code: "*/15 * * * * /usr/bin/python3 /home/username/task.py"
      - label: Weekly cleanup task
        code: "0 3 * * 0 root /usr/bin/apt autoremove -y"
---
