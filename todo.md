# Todos

## Fixes

- [ ] Snippet card: move action buttons to right of title, to tighten up card.

---

## Settings

- [ ] Add tabs for package manager in guides. e.g. apt, dnf, homebrew, macports, pacman

---

## Docs

### Linux

- [ ] Update security page with more content:
  - [ ] AppArmor / SELinux: Could add a section recommending enabling AppArmor profiles.
  - [ ] Automatic log rotation: logrotate for SSH, Fail2Ban logs.
  - [ ] Regular audit tools: Recommend lynis or chkrootkit for periodic audits.
  - [ ] Strong password policy: Could include libpam-pwquality or PAM rules for local accounts.
  - [ ] Kernel / sysctl hardening: Add /etc/sysctl.d/ tweaks (disable IP forwarding, limit ICMP, protect against SYN floods, etc.).
- [ ] Move tailscale to it’s own page.
- [ ] Move Adguard + NPM to docker apps.

### macOS

- [ ] Update to use stash instead of installing all of those packages and global configs.

### Windows

- [ ] Add setup
- [ ](winutil)[https://github.com/christitustech/winutil] `irm https://christitus.com/win | iex`

---

### Docker

- Docker apps
  - [ ] appwrite
  - [ ] archivebox
  - [ ] duplicati
  - [ ] excalidraw
  - [ ] filecloud
  - [ ] headscale
  - [ ] kasm
  - [ ] postal
  - [ ] restic and healthchecks https://nerdyarticles.com/backup-strategy-with-restic-and-healthchecks-io/
  - [ ] rustdesk

---

## Cheatsheets

### Docker

- [ ] Docker security best practices
  - [ ] rootless
  - [ ] distroless
- [ ] Docker secrets and environment variables
- [ ] Docker Swarm basics
- [ ] Networking and custom bridge networks
- [ ] Managing volumes and persistent storage

### Networking

- [ ] This already partially exists inside terminal cheetsheet. Move all there.
- [ ] Have different options for native commands on macos, linux and windows.

### Git

- [ ] Trim, rephrase descriptions and add comments as necessary.
