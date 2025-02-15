# Todos

---

## Docs

### Linux

- [ ] Add tailscale/headscale setup
- [ ] Add to docker setup

```sh
sudo systemctl stop docker
sudo mkdir -p /mnt/flex/docker-data
sudo mv /var/lib/docker /mnt/flex/docker-data
sudo nano /etc/docker/daemon.json

# daemon.json
{
  "data-root": "/mnt/flex/docker-images"
}

sudo systemctl daemon-reload
sudo systemctl restart docker

# verify (optional)
docker info | grep "Docker Root Dir"
```

#### Docker apps

- [ ] Add rustdesk

### macOS

- [ ] Refactor nix setup
- [ ] Add homebrew setup

---

## Cheatsheets

- [ ] Add content to docker
- [ ] Add content to markdown
- [ ] Add content jq
- [ ] Add content nano
- [ ] Add content vim
