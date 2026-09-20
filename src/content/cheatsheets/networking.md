---
title: networking
description: Common networking commands and configuration tools including connectivity tests, interface management, firewalls and routing.
updatedAt: 2026-09-20 18:08:42
groups:
  - title: Basics
    description: Common commands for connectivity and network information.
    items:
      - label: Check network connectivity
        description: Check network connectivity to a host.
        code: ping <host>
        example: ping google.com
      - label: Display network interfaces
        description: Display network interface configuration and IP addresses.
        platforms:
          - os: ["macos", "linux"]
            code: ifconfig
            codeLang: sh
          - os: ["windows"]
            code: ipconfig
            codeLang: ps1
      - label: Display network connections
        description: Display active network connections and ports.
        platforms:
          - os: ["macos", "linux"]
            code: netstat -an
            codeLang: sh
          - os: ["windows"]
            code: Get-NetTCPConnection
            codeLang: ps1
      - label: Transfer data from server
        description: Transfer data from or to a server.
        code: curl <url>
        example: curl https://www.example.com
      - label: Download file from URL
        description: Download a file from a URL.
        platforms:
          - os: ["macos", "linux"]
            code: wget <url>
            codeLang: sh
            example: wget https://www.example.com/file.zip
          - os: ["windows"]
            code: Invoke-WebRequest -Uri <url> -OutFile <output_file>
            codeLang: ps1
            example: Invoke-WebRequest -Uri https://www.example.com/file.zip -OutFile file.zip
  - title: IP and Routing
    description: Manage network interfaces, IP addresses and routing tables.
    items:
      - label: Show IP addresses
        description: Show IP addresses assigned to network interfaces.
        platforms:
          - os: ["linux"]
            code: ip addr show
            codeLang: sh
          - os: ["macos"]
            code: scutil --nwi
            codeLang: sh
          - os: ["windows"]
            code: Get-NetIPAddress
            codeLang: ps1
      - label: Display routing table
        description: Display the system routing table.
        platforms:
          - os: ["macos", "linux"]
            code: netstat -rn
            codeLang: sh
          - os: ["windows"]
            code: Get-NetRoute
            codeLang: ps1
      - label: Set interface state
        description: Bring a network interface up or down.
        platforms:
          - os: ["linux"]
            code: ip link set <iface> up
            example: ip link set eth0 up
            codeLang: sh
            comment: Replace up with down to disable interface.
          - os: ["windows"]
            code: Disable-NetAdapter -Name <iface>
            example: Disable-NetAdapter -Name Ethernet
            codeLang: ps1
            comment: Use Enable-NetAdapter to bring the interface up.
      - label: Add static route
        description: Add a static route to the routing table.
        platforms:
          - os: ["linux"]
            code: ip route add <subnet> via <gateway>
            codeLang: sh
            example: ip route add {{SUBNET_VAR}} via {{GATEWAY_IP_ADDRESS_VAR}}
          - os: ["windows"]
            code: New-NetRoute -DestinationPrefix <subnet> -InterfaceAlias <iface> -NextHop <gateway>
            codeLang: ps1
            example: New-NetRoute -DestinationPrefix {{SUBNET_VAR}} -InterfaceAlias Ethernet -NextHop {{GATEWAY_IP_ADDRESS_VAR}}
  - title: Firewall Management
    description: Managing firewall rules across different operating systems.
    items:
      - label: List firewall rules
        description: List active firewall rules and configuration.
        platforms:
          - os: ["linux"]
            code: iptables -L
            codeLang: sh
          - os: ["macos"]
            code: pfctl -s rules
            codeLang: sh
          - os: ["windows"]
            code: Get-NetFirewallRule
            codeLang: ps1
      - label: Allow incoming traffic
        description: Allow incoming TCP traffic on a specific port.
        platforms:
          - os: ["linux"]
            code: iptables -A INPUT -p tcp --dport <port> -j ACCEPT
            codeLang: sh
            example: iptables -A INPUT -p tcp --dport 22 -j ACCEPT
          - os: ["windows"]
            code: New-NetFirewallRule -DisplayName "Allow Port <port>" -Direction Inbound -Protocol TCP -LocalPort <port> -Action Allow
            codeLang: ps1
            example: New-NetFirewallRule -DisplayName "Allow Port 22" -Direction Inbound -Protocol TCP -LocalPort 22 -Action Allow
      - label: Block incoming traffic
        description: Block incoming TCP traffic on a specific port.
        platforms:
          - os: ["linux"]
            code: iptables -A INPUT -p tcp --dport <port> -j DROP
            codeLang: sh
            example: iptables -A INPUT -p tcp --dport 80 -j DROP
          - os: ["windows"]
            code: New-NetFirewallRule -DisplayName "Block Port <port>" -Direction Inbound -Protocol TCP -LocalPort <port> -Action Block
            codeLang: ps1
            example: New-NetFirewallRule -DisplayName "Block Port 80" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Block
  - title: Network Configuration & Management
    description: Configuring network interfaces, profiles, and backend services.
    items:
      - label: Show network status
        description: Show status of all network interfaces or managers.
        platforms:
          - os: ["linux"]
            code: networkctl status
            codeLang: sh
          - os: ["windows"]
            code: Get-NetAdapter
            codeLang: ps1
      - label: Show interface details
        description: Show detailed status of a specific interface.
        platforms:
          - os: ["linux"]
            code: networkctl status <iface>
            codeLang: sh
            example: networkctl status eth0
          - os: ["windows"]
            code: Get-NetAdapter -Name <iface>
            codeLang: ps1
            example: Get-NetAdapter -Name Ethernet
      - label: Restart network service
        description: Restart the underlying network management service.
        platforms:
          - os: ["linux"]
            code: sudo systemctl restart systemd-networkd
            codeLang: sh
          - os: ["windows"]
            code: Restart-Service -Name Dhcp
            codeLang: ps1
      - label: Enable network service
        description: Enable the network service to start at boot.
        platforms:
          - os: ["linux"]
            code: sudo systemctl enable systemd-networkd
            codeLang: sh
          - os: ["windows"]
            code: Set-Service -Name Dhcp -StartupType Automatic
            codeLang: ps1
  - title: nmap
    description: Network discovery, port scanning, and service identification.
    items:
      - label: Scan network for open port
        description: Find devices on a network with a specific port open.
        code: nmap -p <port> --open <subnet>
        example: nmap -p 22 --open {{SUBNET_VAR}}
      - label: Discover active devices
        description: Discover active devices on a network without scanning ports.
        code: nmap -sn <subnet>
        example: nmap -sn {{SUBNET_VAR}}
      - label: Detect service versions
        description: Detect services and versions running on a host.
        code: nmap -sV <host>
        example: nmap -sV {{CLIENT_IP_VAR}}
      - label: Scan specific ports
        description: Scan specific ports on a host.
        code: nmap -p <ports> <host>
        example: nmap -p 22,80,443 {{CLIENT_IP_VAR}}
      - label: Scan all TCP ports
        description: Scan all TCP ports on a host.
        code: nmap -p- <host>
        example: nmap -p- {{CLIENT_IP_VAR}}
      - label: Identify operating system
        description: Attempt to identify the operating system of a host.
        code: nmap -O <host>
        example: nmap -O {{CLIENT_IP_VAR}}
      - label: Comprehensive host scan
        description: Perform OS detection, version detection, script scanning, and traceroute.
        code: nmap -A <host>
        example: nmap -A {{CLIENT_IP_VAR}}
      - label: Scan for vulnerabilities
        description: Check a host for known vulnerabilities using Nmap scripts.
        code: nmap --script vuln <host>
        example: nmap --script vuln {{CLIENT_IP_VAR}}
  - title: Troubleshooting
    description: Tools for debugging network issues.
    items:
      - label: Trace packet route
        description: Trace the route packets take to a destination.
        platforms:
          - os: ["macos", "linux"]
            code: traceroute <host>
            codeLang: sh
            example: traceroute google.com
          - os: ["windows"]
            code: tracert <host>
            codeLang: ps1
            example: tracert google.com
      - label: Query DNS information
        description: Query DNS information about a domain.
        code: dig <domain>
        example: dig example.com
      - label: Look up DNS records
        description: Look up DNS records for a domain.
        platforms:
          - os: ["macos", "linux"]
            code: nslookup <domain>
            codeLang: sh
            example: nslookup example.com
          - os: ["windows"]
            code: Resolve-DnsName <domain>
            codeLang: ps1
            example: Resolve-DnsName example.com
      - label: Test port connectivity
        description: Test connectivity to a specific port using netcat or PowerShell.
        platforms:
          - os: ["macos", "linux"]
            code: nc -zv <host> <port>
            codeLang: sh
            example: nc -zv google.com 443
          - os: ["windows"]
            code: Test-NetConnection -ComputerName <host> -Port <port>
            codeLang: ps1
            example: Test-NetConnection -ComputerName google.com -Port 443
      - label: Capture network packets
        description: Capture packets on a network interface.
        platforms:
          - os: ["macos", "linux"]
            code: tcpdump -i <iface>
            codeLang: sh
            example: tcpdump -i eth0
          - os: ["windows"]
            code: netsh trace start capture=yes
            codeLang: ps1
            comment: Use netsh trace stop to end capture.
---
