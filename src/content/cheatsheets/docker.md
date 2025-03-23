---
title: docker
description: Docker commands categorized for managing containers, images, networks, volumes and more.
updatedAt: 2025-03-17 21:29:03
groups:
  - title: Containers
    description: Commands for managing running and stopped containers.
    items:
      - label: List all containers
        description: Shows running containers by default, use `-a` to show all.
        code: "docker ps -a"
        comment: "Use `docker ps` to list only running containers."
      - label: Start a container
        description: Starts a stopped container.
        code: "docker start <container_id>"
        comment: "Replace `<container_id>` with the actual container ID or name."
      - label: Stop a container
        description: Stops a running container.
        code: "docker stop <container_id>"
        comment: "Gracefully stops a container. Use `docker kill` to force stop."
      - label: Remove a container
        description: Deletes a stopped container.
        code: "docker rm <container_id>"
        comment: "Use `-f` to force remove a running container."
  - title: Images
    description: Commands for managing Docker images.
    items:
      - label: List images
        description: Displays a list of all locally stored images.
        code: "docker images"
        comment: "Shows repository, tag, and image ID."
      - label: Remove an image
        description: Deletes a Docker image from local storage.
        code: "docker rmi <image_id>"
        comment: "Use `docker image prune` to remove all unused images."
      - label: Pull an image
        description: Downloads an image from a Docker registry.
        code: "docker pull <image_name>"
        comment: "Use `docker pull <image>:<tag>` to specify a version."
      - label: Build an image
        description: Builds a Docker image from a Dockerfile.
        code: "docker build -t <image_name> ."
        comment: "The `-t` flag assigns a name to the image."
  - title: Volumes
    description: Commands for managing Docker volumes.
    items:
      - label: List volumes
        description: Shows all Docker volumes.
        code: "docker volume ls"
        comment: "Volumes persist data independently of containers."
      - label: Create a volume
        description: Creates a new Docker volume.
        code: "docker volume create <volume_name>"
        comment: "Useful for persistent storage."
      - label: Remove a volume
        description: Deletes a Docker volume.
        code: "docker volume rm <volume_name>"
        comment: "Ensure the volume is not in use before deleting."
  - title: Networks
    description: Commands for managing Docker networks.
    items:
      - label: List networks
        description: Displays all Docker networks.
        code: "docker network ls"
        comment: "Lists bridge, host, and custom networks."
      - label: Create a network
        description: Creates a custom Docker network.
        code: "docker network create <network_name>"
        comment: "Use `--driver` to specify the network type."
      - label: Connect a container to a network
        description: Attaches a container to a specified network.
        code: "docker network connect <network_name> <container_id>"
        comment: "Allows inter-container communication."
      - label: Disconnect a container from a network
        description: Detaches a container from a network.
        code: "docker network disconnect <network_name> <container_id>"
        comment: "Useful for network isolation."
  - title: Docker Compose
    description: Commands for managing multi-container applications using Docker Compose.
    items:
      - label: Start services
        description: Starts all services defined in the `docker-compose.yml` file.
        code: "docker compose up -d"
        comment: "Use `-d` to run in detached mode."
      - label: Stop services
        description: Stops all running services.
        code: "docker compose down"
        comment: "Stops and removes containers, networks, and volumes if specified."
      - label: Restart services
        description: Restarts all running services.
        code: "docker compose restart"
        comment: "Useful for applying config changes without stopping everything."
      - label: View service logs
        description: Displays logs for all services.
        code: "docker compose logs -f"
        comment: "Use `-f` to follow logs in real time."
      - label: List running services
        description: Shows all active services.
        code: "docker compose ps"
        comment: "Displays container names, status, and ports."
      - label: Execute a command in a service container
        description: Runs a command inside a running service.
        code: "docker compose exec <service_name> <command>"
        comment: "Example: `docker compose exec app bash` for interactive shell."
      - label: Build images
        description: Builds images for services defined in the `docker-compose.yml` file.
        code: "docker compose build"
        comment: "Use `--no-cache` to force a fresh build."
  - title: Docker Build
    description: Commands for building and managing Docker images.
    items:
      - label: Build an image from a Dockerfile
        description: Creates a Docker image from a Dockerfile in the current directory.
        code: "docker build -t <image_name> ."
        comment: "The `-t` flag assigns a name to the image."
      - label: Build an image with no cache
        description: Forces a fresh build without using cached layers.
        code: "docker build --no-cache -t <image_name> ."
        comment: "Useful when ensuring all layers are rebuilt."
      - label: Build an image with a specific Dockerfile
        description: Specifies a custom Dockerfile for the build.
        code: "docker build -f <Dockerfile> -t <image_name> ."
        comment: "Allows using a different Dockerfile than the default."
      - label: Build and push an image in one command
        description: Builds and directly pushes the image to a registry.
        code: "docker buildx build --push --tag <registry>/<image_name>:<tag> ."
        comment: "Requires BuildKit and authentication to the registry."
      - label: Show build cache usage
        description: Displays information about the build cache.
        code: "docker system df"
        comment: "Use `docker builder prune` to remove unused cache."
  - title: System Cleanup
    description: Commands for cleaning up unused Docker resources.
    items:
      - label: Remove all stopped containers
        description: Deletes all stopped containers.
        code: "docker container prune"
        comment: "Frees up disk space."
      - label: Remove all unused images
        description: Deletes all dangling images.
        code: "docker image prune"
        comment: "Use `docker image prune -a` to remove all unused images."
      - label: Remove all unused volumes
        description: Deletes all unused volumes.
        code: "docker volume prune"
        comment: "Useful for clearing orphaned volumes."
      - label: Remove all unused networks
        description: Deletes all unused networks.
        code: "docker network prune"
        comment: "Cleans up unused networks to free space."
  - title: Miscellaneous
    description: Various useful Docker commands that don't fit into other categories.
    items:
      - label: Run a container interactively
        description: Starts a container and opens an interactive shell session.
        code: "docker run -it <image_name> /bin/bash"
        comment: "Use `--rm` to automatically remove the container after exit."
      - label: Execute a command as a specific user
        description: Runs a command inside a running container.
        code: "docker exec -u 1000:1000 -it <container_id> /bin/bash"
        comment: "Replace `1000:1000` with the desired UID:GID."
      - label: Copy files from container to host
        description: Copies files from a running container to the local filesystem.
        code: "docker cp <container_id>:/path/to/file /destination/path"
        comment: "Use `docker cp /local/path <container_id>:/path/to/file` to copy to the container."
      - label: Get detailed container information
        description: Displays low-level information about a container.
        code: "docker inspect <container_id>"
        comment: "Provides detailed metadata, including network settings and mounts."
      - label: Get container resource usage stats
        description: Displays real-time CPU, memory, and I/O statistics for containers.
        code: "docker stats"
        comment: "Useful for monitoring container performance."
      - label: Get container logs in real-time
        description: Shows logs from a running container.
        code: "docker logs -f <container_id>"
        comment: "Use `-f` to follow logs live, or `--tail <number>` to show last N lines."
---
