export const sshdConfig = `
# Disable password auth
PasswordAuthentication no

# Prevent root login entirely
PermitRootLogin no

# Custom SSH port (optional)
Port 2222

# Only allow specific users (optional)
AllowUsers {{USERNAME_VAR}} $USERNAME2 $USERNAME3
`;

export const sshConfig = `
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
