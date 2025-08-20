---
title: Networking
description: Common networking commands and configuration tools including connectivity tests, interface management, firewalls and routing.
updatedAt: 2025-08-20 10:30:12
groups:
  - title: Basics
    description: Common commands for connectivity and network information.
    items:
      - label: ping [host]
        description: Check network connectivity to a host.
        code: ping google.com
      - label: ifconfig
        description: Display network interface information (macOS/Linux).
        code: ifconfig
      - label: ipconfig
        description: Display network interface information (Windows).
        code: ipconfig
      - label: netstat
        description: Display network connections.
        code: netstat
      - label: curl [url]
        description: Transfer data from or to a server.
        code: curl https://www.example.com
      - label: wget [url]
        description: Download a file from a URL.
        code: wget https://www.example.com/file.zip
  - title: IP and Routing
    description: Manage network interfaces, IP addresses and routing tables.
    items:
      - label: ip addr show
        description: Show IP addresses assigned to interfaces.
        code: ip addr show
      - label: ip route show
        description: Display the routing table.
        code: ip route show
      - label: ip link set [iface] up/down
        description: Bring a network interface up or down.
        code: ip link set eth0 up
      - label: ip route add [network] via [gateway]
        description: Add a static route.
        code: ip route add 192.168.1.0/24 via 192.168.1.1
  - title: Firewall (iptables)
    description: Managing firewall rules with iptables.
    items:
      - label: iptables -L
        description: List all rules in the filter table.
        code: iptables -L
      - label: iptables -A INPUT -p tcp --dport 22 -j ACCEPT
        description: Allow incoming SSH connections.
        code: iptables -A INPUT -p tcp --dport 22 -j ACCEPT
      - label: iptables -A INPUT -p tcp --dport 80 -j DROP
        description: Block incoming HTTP traffic.
        code: iptables -A INPUT -p tcp --dport 80 -j DROP
      - label: iptables-save > rules.v4
        description: Save iptables rules to a file.
        code: iptables-save > rules.v4
      - label: iptables-restore < rules.v4
        description: Restore iptables rules from a file.
        code: iptables-restore < rules.v4
  - title: Firewall (nftables)
    description: Managing firewall rules with nftables (modern replacement for iptables).
    items:
      - label: nft list ruleset
        description: Show current nftables ruleset.
        code: nft list ruleset
      - label: nft add table inet filter
        description: Create a new table for filtering.
        code: nft add table inet filter
      - label: nft add chain inet filter input { type filter hook input priority 0 \; }
        description: Create an input chain in the filter table.
        code: nft add chain inet filter input { type filter hook input priority 0 \; }
      - label: nft add rule inet filter input tcp dport 22 accept
        description: Allow incoming SSH connections.
        code: nft add rule inet filter input tcp dport 22 accept
      - label: nft delete rule inet filter input handle [num]
        description: Delete a specific rule by its handle number.
        code: nft delete rule inet filter input handle 5
  - title: Network Configuration (Netplan)
    description: Configuring network interfaces with Netplan (Ubuntu and related distros).
    items:
      - label: ls /etc/netplan/
        description: Show available Netplan configuration files.
        code: ls /etc/netplan/
      - label: sudo nano /etc/netplan/01-netcfg.yaml
        description: Edit Netplan configuration file.
        code: sudo nano /etc/netplan/01-netcfg.yaml
      - label: sudo netplan apply
        description: Apply Netplan configuration changes.
        code: sudo netplan apply
      - label: sudo netplan try
        description: Test configuration safely (reverts after 120s if not confirmed).
        code: sudo netplan try
  - title: Network Configuration (systemd-networkd)
    description: Managing network settings using systemd-networkd.
    items:
      - label: networkctl status
        description: Show status of all network interfaces.
        code: networkctl status
      - label: networkctl status [iface]
        description: Show detailed status of a specific interface.
        code: networkctl status eth0
      - label: sudo systemctl restart systemd-networkd
        description: Restart the systemd-networkd service.
        code: sudo systemctl restart systemd-networkd
      - label: sudo systemctl enable systemd-networkd
        description: Enable systemd-networkd to start at boot.
        code: sudo systemctl enable systemd-networkd
      - label: sudo nano /etc/systemd/network/20-wired.network
        description: Edit a network configuration file for an interface.
        code: sudo nano /etc/systemd/network/20-wired.network
      - label: sudo networkctl reload
        description: Reload configuration without restarting the service.
        code: sudo networkctl reload
  - title: Troubleshooting
    description: Tools for debugging network issues.
    items:
      - label: traceroute [host]
        description: Trace the route packets take to a destination.
        code: traceroute google.com
      - label: dig [domain]
        description: Query DNS information about a domain.
        code: dig example.com
      - label: nslookup [domain]
        description: Look up DNS records for a domain.
        code: nslookup example.com
      - label: nc -zv [host] [port]
        description: Test connectivity to a specific port using netcat.
        code: nc -zv google.com 443
      - label: tcpdump -i [iface]
        description: Capture packets on a network interface.
        code: tcpdump -i eth0
---
