# Todos

## Fix

- [ ] copying compose.yml or other files on mobile does not paste with same indents,spaces

## Settings

- [ ] Add tabs for package manager in guides. e.g. apt, dnf, homebrew, macports, pacman

---

## Docs

### Global

- [ ] Auto update lastUpdated frontmatter.

### Linux

- [ ] Update security page with more content:
  - [ ] AppArmor / SELinux: Could add a section recommending enabling AppArmor profiles.
  - [ ] Automatic log rotation: logrotate for SSH, Fail2Ban logs.
  - [ ] Regular audit tools: Recommend lynis or chkrootkit for periodic audits.
  - [ ] Strong password policy: Could include libpam-pwquality or PAM rules for local accounts.
  - [ ] Kernel / sysctl hardening: Add /etc/sysctl.d/ tweaks (disable IP forwarding, limit ICMP, protect against SYN floods, etc.).

### Windows

- [ ] Add Windows Utility setup
- [ ] Add other configs.

---

### Docker

- Docker apps
  - [ ] archivebox
  - [ ] excalidraw
  - [ ] filecloud
  - [ ] kasm
  - [ ] postal
  - [ ] rustdesk

### Backups

immich example: base command

```sh
rsync -avhP --delete \
  --exclude='thumbs/' \
  --exclude='encoded-video/' \
  ~/.opt/stacks/immich/library/ rpi:/mnt/flex/backups/immich/
```

```sh
nano ~/.opt/stacks/immich/backup.sh
```

```sh
#!/bin/bash

# Configuration
BACKUP_SRC="$HOME/.opt/stacks/immich/library/"
BACKUP_DEST="rpi:/mnt/flex/backups/immich/"
LOG_DIR="$HOME/.opt/stacks/immich/backup_logs"

# Ensure log directory exists
mkdir -p "$LOG_DIR"

# Create a timestamped log file for this run
LOG_FILE="$LOG_DIR/backup_$(date +%Y%m%d_%H%M%S).log"

echo "=== Immich Backup Started: $(date) ===" | tee -a "$LOG_FILE"

# Run rsync with all your flags
rsync -avhP --delete \
  --exclude='thumbs/' \
  --exclude='encoded-video/' \
  "$BACKUP_SRC" "$BACKUP_DEST" 2>&1 | tee -a "$LOG_FILE"

EXIT_STATUS=${PIPESTATUS[0]}

echo "=== Immich Backup Finished: $(date) (Exit code: $EXIT_STATUS) ===" | tee -a "$LOG_FILE"

# Clean up old logs: keep only the 3 most recent log files
cd "$LOG_DIR" && ls -t backup_*.log 2>/dev/null | tail -n +4 | xargs -r rm -f

exit $EXIT_STATUS
```

```sh
chmod +x ~/.opt/stacks/immich/backup.sh
```

```sh
crontab -e
```

```sh
0 2 * * * /home/huffmanks/.opt/stacks/immich/backup.sh >/dev/null 2>&1
```
