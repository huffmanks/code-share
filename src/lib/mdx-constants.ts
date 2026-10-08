// src/content/docs/guides/linux/ssh.mdx
export const linuxSshdConfig = `
# Disable password auth
PasswordAuthentication no

# Prevent root login entirely
PermitRootLogin no

# Custom SSH port (optional)
Port 2222

# Only allow specific users (optional)
AllowUsers {{USERNAME_VAR}} $USERNAME2 $USERNAME3
`;

export const linuxSshConfig = `
# Default settings for all hosts
Host *
    ServerAliveInterval 60
    ServerAliveCountMax 5

# Example host
Host {{HOSTNAME_VAR}}
    HostName {{SERVER_IP_VAR}}
    User {{USERNAME_VAR}}
    Port 22
    IdentityFile ~/.ssh/id_{{HOSTNAME_VAR}}
`;

// src/content/docs/guides/android/index.mdx
export const androidBashrc = `
export PATH="$PATH:/home/droid/.local/bin

if [ -x "$(command -v zsh)" ]; then
  export SHELL=$(command -v zsh)
  exec $(command -v zsh) -l
fi
`;

// src/content/docs/guides/docker/index.mdx
export const debianAptSource = `
echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
`;

export const ubuntuAptSource = `
echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
`;

export const daemonJson = `
{
  "data-root": "{{EXTERNAL_HDD_PATH_VAR}}/docker-data"
}
`;

export const verifyDockerData = `
# Docker Root Dir: {{EXTERNAL_HDD_PATH_VAR}}/docker-data
docker info | grep "Docker Root Dir"
`;

// src/content/docs/guides/docker/apps/ntfy.mdx
export const exampleHttp = `
curl -X POST "http://localhost:8383/test_topic" \
  -H "Authorization: Bearer <tk_your_token>" \
  -H "Title: Test Title" \
  -H "Tags: rocket,star" \
  -H "Priority: default" \
  -d "Message using a token"
`;

export const exampleCli = `
ntfy publish \
  --host="http://localhost:8383" \
  --token="<tk_your_token>" \
  --title="Test Title" \
  --tags="rocket,star" \
  --priority="default" \
  test_topic "Message using a token"
`;

// src/content/docs/guides/docker/apps/opencloud.mdx
export const initDocker = `
docker run --rm -it \
    -v ./opencloud-config:/etc/opencloud \
    -v ./opencloud-data:/var/lib/opencloud \
    -e IDM_ADMIN_PASSWORD=admin \
    opencloudeu/opencloud-rolling:latest init
`;

// src/content/docs/guides/docker/apps/traefik.mdx
export const setupUrl = `https://auth.${"{{BASE_SUB_DOMAIN_VAR}}"}/setup`;

// src/content/docs/guides/linux/storage/external-hdd-setup.mdx
export const identifyDrive = `
# Identify the target drive, i.e., /dev/sde
lsblk
`;

// src/content/docs/guides/linux/miscellaneous/laptop-optimization.mdx
export const logindConf = `
HandleSuspendKey=ignore
HandleLidSwitch=ignore
HandleLidSwitchExternalPower=ignore
HandleLidSwitchDocked=ignore
`;

export const noSleepConfig = `
[Sleep]
AllowSuspend=no
AllowHibernation=no
AllowSuspendThenHibernate=no
AllowHybridSleep=no
`;

// src/content/docs/guides/linux/miscellaneous/configure-network.mdx
export const systemdResolvedConfig = `
[Resolve]
DNS=1.1.1.1 8.8.8.8
FallbackDNS=1.0.0.1 8.8.4.4
Domains=~.
DNSStubListener=no
`;

export const netplanConfig = `
network:
  version: 2
  renderer: networkd
  ethernets:
    enp3s0:
      dhcp4: true
      # Remove if causing issues when rebooting
      optional: true
      dhcp4-overrides:
        route-metric: 100
        use-dns: false
      nameservers:
        addresses: [1.1.1.1, 8.8.8.8]
  # Optional
  wifis:
    wlan0:
      dhcp4: true
      optional: true
      dhcp4-overrides:
        route-metric: 600
        use-dns: false
      nameservers:
        addresses: [1.1.1.1, 8.8.8.8]
      access-points:
        "Your_SSID_Name":
          password: "Your_Password"
`;

// src/content/docs/guides/linux/miscellaneous/wake-on-lan.mdx
export const wolService = `
[Unit]
Description=Enable Wake On Lan

[Service]
Type=oneshot
ExecStart=/usr/sbin/ethtool -s $INTERFACE_NAME wol g

[Install]
WantedBy=basic.target
`;

// src/content/docs/guides/macos/programs/opencode.mdx
export const opencodeJson = `
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "omniroute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "YOUR_OMNIROUTE_API_KEY"
      },
      "models": {
        "auto": {
          "name": "Auto / Best Available"
        }
      }
    }
  }
}
`;

// src/content/docs/guides/macos/nix-darwin.mdx
export const nixInstaller = `
curl --proto '=https' --tlsv1.2 -sSf -L https://install.determinate.systems/nix | \
  sh -s -- install
`;

export const shellConfigBackups = `
sudo mv /etc/zshrc.backup-before-nix /etc/zshrc
sudo mv /etc/bashrc.backup-before-nix /etc/bashrc
sudo mv /etc/bash.bashrc.backup-before-nix /etc/bash.bashrc
`;

export const nixDaemonServices = `
sudo launchctl unload /Library/LaunchDaemons/org.nixos.nix-daemon.plist
sudo rm /Library/LaunchDaemons/org.nixos.nix-daemon.plist
sudo launchctl unload /Library/LaunchDaemons/org.nixos.darwin-store.plist
sudo rm /Library/LaunchDaemons/org.nixos.darwin-store.plist
`;

export const removeNixGroupUsers = `
sudo dscl . -delete /Groups/nixbld

for u in $(sudo dscl . -list /Users | grep _nixbld); do
    sudo dscl . -delete /Users/$u
done
`;

// src/content/docs/guides/linux/storage/smb.mdx
export const smbConf = `
[shared]
   path = {{SMB_SHARE_VAR}}
   read only = no
   browsable = yes
   guest ok = no
`;

// src/content/docs/guides/linux/programs/qt-configuration-tool.mdx
export const oneDarkProConf = `
[ColorScheme]
active_colors=#abb2bf, #282c34, #3a3f4b, #21252b, #4b5363, #3c4049, #abb2bf, #ffffff, #abb2bf, #282c34, #282c34, #181a1f, #3e4451, #abb2bf, #61afef, #c678dd, #21252b, #abb2bf, #282c34, #abb2bf, #14161a
disabled_colors=#5c6370, #21252b, #282c34, #1c1f24, #3c4049, #282c34, #5c6370, #ffffff, #5c6370, #21252b, #21252b, #121417, #21252b, #5c6370, #3e4451, #c678dd, #1c1f24, #5c6370, #21252b, #5c6370, #101214
inactive_colors=#abb2bf, #282c34, #3a3f4b, #21252b, #4b5363, #3c4049, #abb2bf, #ffffff, #abb2bf, #282c34, #282c34, #181a1f, #3e4451, #abb2bf, #61afef, #c678dd, #21252b, #abb2bf, #282c34, #abb2bf, #14161a

[Style]
style=Fusion
palette=OneDarkPro
`;

export const macOSDarkConf = `
[ColorScheme]
active_colors=#ffffff, #1e1e1e, #323232, #262626, #454545, #3a3a3a, #ffffff, #ffffff, #ffffff, #1e1e1e, #1e1e1e, #000000, #4a4a4a, #ffffff, #4a4a4a, #af52de, #262626, #ffffff, #1e1e1e, #ffffff, #181818
disabled_colors=#757575, #1c1c1c, #262626, #1c1c1c, #3a3a3a, #1c1c1c, #757575, #ffffff, #757575, #1c1c1c, #1c1c1c, #000000, #323232, #757575, #323232, #af52de, #1c1c1c, #757575, #1c1c1c, #757575, #121212
inactive_colors=#ffffff, #1e1e1e, #323232, #262626, #454545, #3a3a3a, #ffffff, #ffffff, #ffffff, #1e1e1e, #1e1e1e, #000000, #4a4a4a, #ffffff, #4a4a4a, #af52de, #262626, #ffffff, #1e1e1e, #ffffff, #181818

[Style]
style=Fusion
palette=MacOSDark
`;

// src/content/docs/guides/linux/security.mdx
export const unattendedUpgradesConfig = `
# Update below:
APT::Periodic::Enable "1";
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Download-Upgradeable-Packages "1";
APT::Periodic::Unattended-Upgrade "1";
APT::Periodic::AutocleanInterval "1";
APT::Periodic::Verbose "2";
`;

export const sudoersConfig = `
# Comment out line below to require password for sudo (recommended)
{USERNAME_VAR} ALL=(ALL) NOPASSWD: ALL
`;

export const fail2banConfig = `
[DEFAULT]
bantime.increment = true
bantime.factor = 1
bantime.maxtime = 5w

[sshd]
enabled = true
port = ssh
filter = sshd
backend = systemd
maxretry = 3
findtime = 600
bantime = 3600
ignoreip = 127.0.0.1/8 ::1 {{SUBNET_VAR}}
`;

export const ufwSysctl = `
net/ipv4/ip_forward=1
net/ipv6/conf/default/forwarding=1
`;

// src/content/docs/guides/docker/archived/nginx-proxy-manager.mdx
export const serverIp = `{{SERVER_IP_VAR}}`;
export const virtualIp = `{{VIRTUAL_IP_VAR}}`;
export const npmServerLink = `http://${serverIp}:81`;
export const adguardSetupLink = `http://${serverIp}:3000`;
export const adguardAdminLink = `http://${serverIp}:8080`;

// src/content/docs/guides/linux/programs/tailscale.mdx
export const ethtool = `
NETDEV=$(ip -o route get 1.1.1.1 | cut -f 5 -d " ")
sudo ethtool -K $NETDEV rx-udp-gro-forwarding on rx-gro-list off
`;

export const networkdDispatcher = `
printf '#!/bin/sh

ethtool -K %s rx-udp-gro-forwarding on rx-gro-list off
' "$(ip -o route get 1.1.1.1 | cut -f 5 -d " ")" | sudo tee /etc/networkd-dispatcher/routable.d/50-tailscale
sudo chmod 755 /etc/networkd-dispatcher/routable.d/50-tailscale
`;

export const ipForwarding = `
echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
echo 'net.ipv6.conf.all.forwarding = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
sudo sysctl -p /etc/sysctl.d/99-tailscale.conf
`;

// src/content/docs/guides/docker/apps/dispatcharr.mdx
export const generateChannels = `
import json
import os
import re
import urllib.request
import urllib.error
from xml.sax.saxutils import escape

# Explicit list of site domains to skip entirely
BROKEN_SITES = {
    "tv.mail.ru",
}

m3u_urls = [
    "https://iptv-org.github.io/iptv/categories/sports.m3u",
]

all_channels = []
seen_ids = set()

for url in m3u_urls:
    print(f"Downloading playlist from {url}...")
    try:
        req = urllib.request.urlopen(url)
        content = req.read().decode('utf-8')

        for line in content.splitlines():
            if line.startswith("#EXTINF:"):
                tvg_id_match = re.search(r'tvg-id="([^"]*)"', line)
                parts = line.split(",")
                name = parts[-1].strip() if len(parts) > 1 else "Unknown"
                tvg_id = tvg_id_match.group(1) if tvg_id_match else ""

                if tvg_id and tvg_id not in seen_ids:
                    seen_ids.add(tvg_id)
                    all_channels.append((tvg_id, name))
    except Exception as e:
        print(f"Error fetching {url}: {e}")

print(f"Total unique raw tvg-ids from M3U: {len(all_channels)}")

# Fetch guides database
print("Fetching IPTV-org guides database...")
guides_url = "https://iptv-org.github.io/api/guides.json"
guides_by_channel = {}
guides_by_site_id = {}
guides_by_name = {}

def normalize(text):
    return re.sub(r'[^a-z0-9]', '', text.lower())

try:
    req = urllib.request.urlopen(guides_url)
    guides_data = json.loads(req.read().decode('utf-8'))

    for g in guides_data:
        chan = g.get("channel")
        site = g.get("site")
        site_id = g.get("site_id")
        site_name = g.get("site_name", "")

        # Skip invalid entries or explicitly blacklisted sites
        if not site or not site_id or site_id == "#" or site in BROKEN_SITES:
            continue

        guide_obj = {
            "site": site,
            "site_id": site_id,
            "lang": g.get("lang", "")
        }

        if chan and chan not in guides_by_channel:
            guides_by_channel[chan] = guide_obj

        if site_id and site_id not in guides_by_site_id:
            guides_by_site_id[site_id] = guide_obj

        if site_name:
            norm_name = normalize(site_name)
            if norm_name not in guides_by_name:
                guides_by_name[norm_name] = guide_obj

except Exception as e:
    print(f"Error fetching guides database: {e}")

# Cache site reachability check so we don't spam requests to the same site
site_status_cache = {}

def is_site_working(site):
    if site in BROKEN_SITES:
        return False

    if site in site_status_cache:
        return site_status_cache[site]

    url = f"https://{site}" if not site.startswith("http") else site
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

    # Try HEAD request first for efficiency
    try:
        req = urllib.request.Request(url, headers=headers, method="HEAD")
        with urllib.request.urlopen(req, timeout=5) as resp:
            working = 200 <= resp.status < 400
    except (urllib.error.HTTPError, urllib.error.URLError, Exception):
        # Fall back to GET in case HEAD request is blocked/unsupported by target web server
        try:
            req = urllib.request.Request(url, headers=headers, method="GET")
            with urllib.request.urlopen(req, timeout=5) as resp:
                working = 200 <= resp.status < 400
        except Exception:
            working = False

    site_status_cache[site] = working
    if not working:
        print(f"Skipping broken site: {site}")
    return working

# Match channels using layered fallback strategies
xml_lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<channels>']
matched_count = 0

for raw_tvg_id, name in all_channels:
    base_id = raw_tvg_id.split("@")[0].strip()
    clean_id = base_id.split(".")[0]  # e.g., "ESPN" from "ESPN.us"
    norm_name = normalize(name)

    matched_guide = (
        guides_by_channel.get(base_id) or
        guides_by_site_id.get(base_id) or
        guides_by_channel.get(clean_id) or
        guides_by_name.get(norm_name)
    )

    if matched_guide:
        site_domain = matched_guide["site"]

        # Skip if in broken sites or fails HTTP ping check
        if site_domain in BROKEN_SITES or not is_site_working(site_domain):
            continue

        site = escape(site_domain)
        site_id = escape(str(matched_guide["site_id"]))
        safe_xmltv_id = escape(raw_tvg_id)
        safe_name = escape(name)
        lang_str = f' lang="{escape(matched_guide["lang"])}"' if matched_guide["lang"] else ""

        xml_lines.append(
            f'  <channel site="{site}" site_id="{site_id}" xmltv_id="{safe_xmltv_id}"{lang_str}>{safe_name}</channel>'
        )
        matched_count += 1

xml_lines.append('</channels>')

output_dir = "./epg-data"
os.makedirs(output_dir, exist_ok=True)
output_path = os.path.join(output_dir, "channels.xml")

with open(output_path, "w", encoding="utf-8") as f:
    f.write("\n".join(xml_lines))

print(f"Successfully generated {output_path} with {matched_count} active matched channels out of {len(all_channels)}!")
`;
