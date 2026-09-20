// src/content/docs/guides/linux/index.mdx
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

// src/content/docs/guides/docker/apps/traefik-with-pocket-id.mdx
export const setupUrl = `https://auth.${"{{BASE_SUB_DOMAIN_VAR}}"}/setup`;

// src/content/docs/guides/linux/external-hdd-setup.mdx
export const identifyDrive = `
# Identify the target drive, i.e., /dev/sde
lsblk
`;

// src/content/docs/guides/linux/miscellaneous.mdx
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

// src/content/docs/guides/linux/smb.mdx
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

// src/content/docs/guides/linux/remote-local-access.mdx
export const serverIp = `{{SERVER_IP_VAR}}`;
export const virtualIp = `{{VIRTUAL_IP_VAR}}`;
export const npmServerLink = `http://${serverIp}:81`;
export const adguardSetupLink = `http://${serverIp}:3000`;
export const adguardAdminLink = `http://${serverIp}:8080`;

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
