# Todos

## Fixes

- [ ] Snippet card: move action buttons to right of title, to tighten up card.

---

## Docs

---

### Linux

- [ ] Update security page with more content:
  - [ ] AppArmor / SELinux: Could add a section recommending enabling AppArmor profiles.
  - [ ] Automatic log rotation: logrotate for SSH, Fail2Ban logs.
  - [ ] Regular audit tools: Recommend lynis or chkrootkit for periodic audits.
  - [ ] Strong password policy: Could include libpam-pwquality or PAM rules for local accounts.
  - [ ] Kernel / sysctl hardening: Add /etc/sysctl.d/ tweaks (disable IP forwarding, limit ICMP, protect against SYN floods, etc.).
- [ ] Add tailscale setup
- [ ] System monitoring (htop, iotop, btop, etc.)
- [ ] File permissions and ownership (chmod, chown)
- [ ] Process management (kill, ps, systemd, etc.)
- [ ] Networking (iptables, nftables, netplan, etc.)
- [ ] Cron jobs and automation

---

### Docker

- [ ] Docker security best practices
  - [ ] rootless
  - [ ] distroless
- [ ] Docker secrets and environment variables
- [ ] Docker Swarm basics
- [ ] Networking and custom bridge networks
- [ ] Managing volumes and persistent storage
- Docker apps
  - [ ] appwrite
  - [ ] archivebox
  - [ ] coolify
  - [ ] duplicati
  - [ ] excalidraw
  - [ ] filecloud
  - [ ] headscale
  - [ ] kasm
  - [ ] ntfy
  - [ ] postal
  - [ ] restic and healthchecks https://nerdyarticles.com/backup-strategy-with-restic-and-healthchecks-io/
  - [ ] rustdesk
