---
title: networking
description: Common networking commands for interfaces, ports, DNS, routing, firewalls and connectivity troubleshooting.
updatedAt: 2026-10-15 12:10:00
groups:
  - title: Most Used
    description: Start here for local network details, open ports and connection failures.
    items:
      - label: Show network interfaces and local IP addresses
        description: Identify network interfaces and the IP addresses assigned to them.
        platforms:
          - os: ["macos"]
            code: scutil --nwi
            codeLang: sh
            secondaryCode:
              title: "Pretty print"
              code: |
                ifconfig | awk '/^[a-zA-Z0-9]/ { iface=$1; sub(/:$/, "", iface) } /inet / { print iface, $2 } /inet6 / && $2 !~ /^fe80:/ { print iface, $2 }'
          - os: ["linux"]
            code: ip -brief address show up
            codeLang: sh
            secondaryCode:
              title: "Pretty print"
              code: |
                ip -brief address show up | awk '{ for (i=3; i<=NF; i++) if ($i ~ /^[0-9a-fA-F:.]+\/[0-9]+$/) print $1, $i }'
          - os: ["windows"]
            code: ipconfig
            codeLang: ps1
            secondaryCode:
              title: "Pretty print"
              code: |
                Get-NetIPAddress -AddressFamily IPv4,IPv6 -ErrorAction SilentlyContinue | Where-Object { $_.AddressState -eq 'Preferred' -and $_.IPAddress -notmatch '^127\.|^::1$|^fe80:' } | ForEach-Object { "$($_.InterfaceAlias) $($_.IPAddress)" }
      - label: Show listening ports
        description: List TCP ports waiting for incoming connections and the processes using them.
        platforms:
          - os: ["macos"]
            code: lsof -nP -iTCP -sTCP:LISTEN
            codeLang: sh
          - os: ["linux"]
            code: ss -lntup
            codeLang: sh
          - os: ["windows"]
            code: Get-NetTCPConnection -State Listen
            codeLang: ps1
            secondaryCode:
              title: "Pretty print"
              code: |
                Get-NetTCPConnection -State Listen | ForEach-Object { $p = Get-Process -Id $_.OwningProcess -ErrorAction SilentlyContinue; [PSCustomObject]@{ Address = $_.LocalAddress; Port = $_.LocalPort; Process = $p.ProcessName; PID = $_.OwningProcess } } | Sort-Object Port | Format-Table -AutoSize
      - label: Check whether a local port is in use
        description: Check a specific local port, replacing 3000 with the port you want to inspect.
        platforms:
          - os: ["macos"]
            code: lsof -nP -i :<port>
            codeLang: sh
            example: lsof -nP -i :3000
          - os: ["linux"]
            code: ss -lntup 'sport = :<port>'
            codeLang: sh
            example: ss -lntup 'sport = :3000'
          - os: ["windows"]
            code: Get-NetTCPConnection -LocalPort <port>
            codeLang: ps1
            example: Get-NetTCPConnection -LocalPort 3000
      - label: Look up a domain's IP address
        description: Check whether DNS can resolve a hostname to an IP address.
        platforms:
          - os: ["macos", "linux"]
            code: dig <domain>
            codeLang: sh
            example: dig example.com
          - os: ["windows"]
            code: Resolve-DnsName <domain>
            codeLang: ps1
            example: Resolve-DnsName example.com
      - label: Trace the route to a host
        description: Show the network hops toward a destination; missing hops may simply ignore probes.
        platforms:
          - os: ["macos"]
            code: traceroute <host>
            codeLang: sh
            example: traceroute example.com
          - os: ["linux"]
            code: tracepath <host>
            codeLang: sh
            example: tracepath example.com
          - os: ["windows"]
            code: Test-NetConnection <host> -TraceRoute
            codeLang: ps1
            example: Test-NetConnection example.com -TraceRoute
      - label: Test a remote port
        description: Check whether a remote host accepts TCP connections on a specific port.
        platforms:
          - os: ["macos", "linux"]
            code: nc -vz -w 3 <host> <port>
            codeLang: sh
            example: nc -vz -w 3 example.com 443
          - os: ["windows"]
            code: Test-NetConnection <host> -Port <port>
            codeLang: ps1
            example: Test-NetConnection example.com -Port 443
      - label: Inspect an HTTP or HTTPS request
        description: Show DNS, connection, TLS and HTTP details to help locate a URL failure.
        platforms:
          - os: ["macos", "linux"]
            code: curl -v --connect-timeout 5 --max-time 15 <url>
            codeLang: sh
            example: curl -v --connect-timeout 5 --max-time 15 https://example.com/
          - os: ["windows"]
            code: curl.exe -v --connect-timeout 5 --max-time 15 <url>
            codeLang: ps1
            example: curl.exe -v --connect-timeout 5 --max-time 15 https://example.com/
  - title: Network diagnostics
    description: Troubleshoot and inspect system network configurations.
    items:
      - label: Show network status
        description: List network interfaces and their current status.
        platforms:
          - os: ["macos"]
            code: networksetup -listallhardwareports
            codeLang: sh
          - os: ["linux"]
            code: ip -brief link
            codeLang: sh
          - os: ["windows"]
            code: Get-NetAdapter
            codeLang: ps1
      - label: Show interface details
        description: Display detailed information for a specific network interface.
        platforms:
          - os: ["macos"]
            code: ifconfig <iface>
            codeLang: sh
            example: ifconfig en0
          - os: ["linux"]
            code: ip address show dev <iface>
            codeLang: sh
            example: ip address show dev eth0
          - os: ["windows"]
            code: Get-NetAdapter -Name <iface>
            codeLang: ps1
            example: Get-NetAdapter -Name Ethernet
      - label: Set interface state
        description: Enable or disable a network interface.
        platforms:
          - os: ["macos"]
            code: sudo ifconfig <iface> down
            codeLang: sh
            example: sudo ifconfig en0 down
            comment: Replace down with up to enable the interface.
          - os: ["linux"]
            code: sudo ip link set <iface> down
            codeLang: sh
            example: sudo ip link set eth0 down
            comment: Replace down with up to enable the interface.
          - os: ["windows"]
            code: Disable-NetAdapter -Name <iface>
            codeLang: ps1
            example: Disable-NetAdapter -Name Ethernet
            comment: Use Enable-NetAdapter to enable the interface.
      - label: ""
        description: ""
        platforms:
          - os: ["macos"]
            code: sudo wdutil info
            codeLang: sh
          - os: ["linux"]
            code: iw dev
            codeLang: sh
          - os: ["windows"]
            code: netsh wlan show interfaces
            codeLang: ps1
      - label: Show configured DNS servers
        description: Display DNS resolver configuration for the system.
        platforms:
          - os: ["macos"]
            code: scutil --dns
            codeLang: sh
          - os: ["linux"]
            code: resolvectl status
            codeLang: sh
            comment: Requires systemd-resolved; inspect /etc/resolv.conf if it is unavailable.
          - os: ["windows"]
            code: Get-DnsClientServerAddress
            codeLang: ps1
      - label: Capture network packets
        description: Capture packets on a network interface; stop the capture with Ctrl+C.
        platforms:
          - os: ["macos", "linux"]
            code: sudo tcpdump -i <iface>
            codeLang: sh
            example: sudo tcpdump -i en0
          - os: ["windows"]
            code: pktmon start --capture
            codeLang: ps1
            comment: Run pktmon stop to stop the capture. Use pktmon help for additional capture options.
  - title: Firewall
    description: Inspect firewall status and manage inbound traffic rules.
    items:
      - label: Show UFW status
        description: Display the status and rules of the UFW firewall.
        platforms:
          - os: ["linux"]
            code: sudo ufw status verbose
            codeLang: sh
      - label: List nftables rules
        description: Display the active nftables ruleset.
        platforms:
          - os: ["linux"]
            code: sudo nft list ruleset
            codeLang: sh
      - label: Show application firewall status
        description: Check whether the macOS application firewall is enabled.
        platforms:
          - os: ["macos"]
            code: /usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate
            codeLang: sh
      - label: Show Windows firewall profiles
        description: Display enabled state and default inbound and outbound actions for each profile.
        platforms:
          - os: ["windows"]
            code: Get-NetFirewallProfile | Select-Object Name, Enabled, DefaultInboundAction, DefaultOutboundAction
            codeLang: ps1
      - label: Allow incoming traffic
        description: Add a rule allowing incoming TCP traffic on a specific port.
        platforms:
          - os: ["linux"]
            code: sudo iptables -A INPUT -p tcp --dport <port> -j ACCEPT
            codeLang: sh
            example: sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
            comment: This changes the active iptables rules and may not persist after reboot.
          - os: ["windows"]
            code: New-NetFirewallRule -DisplayName "Allow Port <port>" -Direction Inbound -Protocol TCP -LocalPort <port> -Action Allow
            codeLang: ps1
            example: New-NetFirewallRule -DisplayName "Allow Port 22" -Direction Inbound -Protocol TCP -LocalPort 22 -Action Allow
      - label: Block incoming traffic
        description: Add a rule blocking incoming TCP traffic on a specific port.
        platforms:
          - os: ["linux"]
            code: sudo iptables -A INPUT -p tcp --dport <port> -j DROP
            codeLang: sh
            example: sudo iptables -A INPUT -p tcp --dport 80 -j DROP
            comment: This changes the active iptables rules and may not persist after reboot.
          - os: ["windows"]
            code: New-NetFirewallRule -DisplayName "Block Port <port>" -Direction Inbound -Protocol TCP -LocalPort <port> -Action Block
            codeLang: ps1
            example: New-NetFirewallRule -DisplayName "Block Port 80" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Block
  - title: Routing
    description: Inspect the routing table and add or remove static routes.
    items:
      - label: Display routing table
        description: Display the system routing table.
        platforms:
          - os: ["macos", "linux"]
            code: netstat -rn
            codeLang: sh
          - os: ["windows"]
            code: route print
            codeLang: ps1
      - label: Add static route
        description: Add a route to a destination subnet through a gateway.
        platforms:
          - os: ["macos"]
            code: sudo route -n add -net <subnet> <gateway>
            codeLang: sh
            example: sudo route -n add -net {{SUBNET_VAR}} {{GATEWAY_IP_ADDRESS_VAR}}
          - os: ["linux"]
            code: sudo ip route add <subnet> via <gateway>
            codeLang: sh
            example: sudo ip route add {{SUBNET_VAR}} via {{GATEWAY_IP_ADDRESS_VAR}}
          - os: ["windows"]
            code: New-NetRoute -DestinationPrefix <subnet> -NextHop <gateway> -InterfaceAlias <iface>
            codeLang: ps1
            example: New-NetRoute -DestinationPrefix {{SUBNET_VAR}} -NextHop {{GATEWAY_IP_ADDRESS_VAR}} -InterfaceAlias Ethernet
  - title: nmap
    description: Network discovery, port scanning and service identification.
    items:
      - label: Scan network for open port
        description: Find devices on a network with a specific port open.
        platforms:
          - os: ["macos", "linux", "windows"]
            code: nmap -p <port> --open <subnet>
            codeLang: sh
            example: nmap -p 22 --open {{SUBNET_VAR}}
      - label: Discover active devices
        description: Discover active devices on a network without scanning ports.
        platforms:
          - os: ["macos", "linux", "windows"]
            code: nmap -sn <subnet>
            codeLang: sh
            example: nmap -sn {{SUBNET_VAR}}
      - label: Detect service versions
        description: Detect services and versions running on a host.
        platforms:
          - os: ["macos", "linux", "windows"]
            code: nmap -sV <host>
            codeLang: sh
            example: nmap -sV {{CLIENT_IP_VAR}}
      - label: Scan specific ports
        description: Scan specific ports on a host.
        platforms:
          - os: ["macos", "linux", "windows"]
            code: nmap -p <ports> <host>
            codeLang: sh
            example: nmap -p 22,80,443 {{CLIENT_IP_VAR}}
      - label: Scan all TCP ports
        description: Scan all TCP ports on a host.
        platforms:
          - os: ["macos", "linux", "windows"]
            code: nmap -p- <host>
            codeLang: sh
            example: nmap -p- {{CLIENT_IP_VAR}}
      - label: Identify operating system
        description: Attempt to identify the operating system of a host.
        platforms:
          - os: ["macos", "linux", "windows"]
            code: nmap -O <host>
            codeLang: sh
            example: nmap -O {{CLIENT_IP_VAR}}
      - label: Comprehensive host scan
        description: Perform OS detection, version detection, script scanning and traceroute.
        platforms:
          - os: ["macos", "linux", "windows"]
            code: nmap -A <host>
            codeLang: sh
            example: nmap -A {{CLIENT_IP_VAR}}
      - label: Scan for vulnerabilities
        description: Check a host for known vulnerabilities using Nmap scripts.
        platforms:
          - os: ["macos", "linux", "windows"]
            code: nmap --script vuln <host>
            codeLang: sh
            example: nmap --script vuln {{CLIENT_IP_VAR}}
---
